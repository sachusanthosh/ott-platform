var express = require('express');
const User = require('../model/userSchema');
const Movie = require('../model/movieSchema');
var router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// require('dotenv').config();


const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
};

// api to create a user
router.post('/auth/register', async (req, res) => {

    try {
        const { userName, email, password, confirmPassword } = req.body;

        if (!userName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and Confirm Password do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already taken' });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, password: hashedPass });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

});


// api to login a user
router.post('/auth/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ message: 'User not found , Signup before login' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET = generateSecretKey(),
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// api to get user details
router.post('/user/change-password', verifyToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/auth/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('userName email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// api to create a movie
router.post('/movie/create', async (req, res) => {

    try {
        const { title, discription, thumbnail, video } = req.body;

        if (!title || !discription || !thumbnail || !video) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newMovie = new Movie({ title, discription, thumbnail, video });
        await newMovie.save();

        res.status(201).json({ message: 'Movie created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

});


// api to get all the movies from the database
router.get('/movies/list', verifyToken, async (req, res) => {

    try {
        const movies = await Movie.find();
        // console.log(movies);
        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found in the database" });
        }

        res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// get specific movie details
router.get('/movies/get-details/:id', async (req, res) => {

    try {
        const movieId = req.query.id;
        const userId = req.user.id;

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const movieDetails = User.findOne({ _id: movieId });
        if (!movieDetails) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie details fetched succesfully", movieDetails });
    } catch (error) {

    }
})


// add to watch later
router.post('/movies/watch-later/add', verifyToken, async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isAlreadyAdded = user.watchLater.some(movie => movie.movieId === movieId);
        if (isAlreadyAdded) {
            return res.status(400).json({ message: "Movie is already in watch later" });
        }

        user.watchLater.push({ movieId });
        await user.save();

        res.status(200).json({ message: "Movie added to watch later", watchLater: user.watchLater });
    } catch (error) {
        console.error("Error adding movie to watch later:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// remove from watch later
router.post('/movies/watch-later/remove', verifyToken, async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const initialLength = user.watchLater.length;
        user.watchLater = user.watchLater.filter(movie => movie.movieId !== movieId);

        if (user.watchLater.length === initialLength) {
            return res.status(400).json({ message: "Movie not found in watch later" });
        }

        await user.save();

        res.status(200).json({ message: "Movie removed from watch later", watchLater: user.watchLater });
    } catch (error) {
        console.error("Error removing movie from watch later:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// retrieve watch later
router.get('/movies/watch-later', verifyToken, async (req, res) => {

    try {
        const userId = req.userId;

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ watchLater: user.watchLater });
    } catch (error) {
        console.error("Error fetching watch later movies:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// add to watch history
router.post('/movies/watch-history/add', verifyToken, async (req, res) => {

    try {
        const { movieId } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.watchHistory.push({ movieId });
        await user.save();

        res.status(200).json({ message: "Movie added to watch history", watchHistory: user.watchHistory });

    } catch (error) {
        console.error("Error adding to watch history movies:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// remove from watch history
router.post('/movies/watch-history/remove', verifyToken, async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.watchHistory = user.watchHistory.filter(movie => movie.movieId !== movieId);
    await user.save();

    res.status(200).json({ message: "Movie removed from watch history", watchHistory: user.watchHistory });
  } catch (error) {
    console.error("Error removing movie from watch history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// retrieve watch history
router.get('/movies/watch-history', verifyToken, async (req, res) => {

    try {
        const userId = req.userId; 

        const user = await User.findById(userId).populate('watchHistory.movieId');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ watchHistory: user.watchHistory });
    } catch (error) {
        console.error("Error fetching watch history movies:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/movies/search', verifyToken, async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { discription: { $regex: query, $options: "i" } }
            ]
        });

        res.status(200).json({ results: movies });
    } catch (error) {
        console.error("Error searching movies:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




module.exports = router;