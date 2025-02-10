var express = require('express');
var router = express.Router();
const Movie = require('../model/movieSchema');

router.get('/', async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const moviesPerPage = 12;
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    const movies = await Movie.find()
        .skip((currentPage - 1) * moviesPerPage)
        .limit(moviesPerPage);

    res.render('movieList', {
        title: 'Movies',
        currentPage,
        moviesPerPage,
        totalMovies,
        totalPages,
        movies,
    });
});

router.get('/edit/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.render('editMovie', { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        // Update only title and description
        movie.title = req.body.title;
        movie.discription = req.body.description;

        await movie.save();
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/create', (req, res) => {
    res.render('createMovie');
});

router.get('/details/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.render('movieDetails', { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;