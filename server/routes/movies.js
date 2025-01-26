var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const moviesPerPage = 12; // Change this to adjust movies per page
    const totalMovies = 50; // Assume 50 movies in total for now
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    res.render('movieList', {
        title: 'Movies',
        currentPage,
        moviesPerPage,
        totalMovies,
        totalPages,
    });
});

router.get('/edit', (req, res) => {
    res.render('editMovie')
})
router.get('/create', (req, res) => {
    res.render('createMovie')
})
router.get('/details', (req, res) => {
    res.render('movieDetails')
})

module.exports = router;