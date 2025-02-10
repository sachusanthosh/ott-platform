var express = require('express');
var router = express.Router();
const User = require('../model/userSchema');
const Movie = require('../model/movieSchema');

router.get('/', async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const usersPerPage = 12;
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const users = await User.find()
        .skip((currentPage - 1) * usersPerPage)
        .limit(usersPerPage);

    res.render('userList', {
        title: 'Users',
        currentPage,
        usersPerPage,
        totalUsers,
        totalPages,
        users,
    });
});

router.get('/details', async (req, res) => {
  try {
      const userId = req.query.id;
      const user = await User.findById(userId)
          .populate({
              path: 'watchHistory.movieId',
              select: 'title' // Fetch only the title field
          });

      if (!user) {
          return res.status(404).send('User not found');
      }

      const totalItems = user.watchHistory.length;
      const limit = 10;
      const currentPage = parseInt(req.query.page) || 1;
      const totalPages = Math.ceil(totalItems / limit);

      res.render('userDetails', {
          title: 'User Details',
          user,
          currentPage,
          limit,
          totalItems,
          totalPages,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

module.exports = router;