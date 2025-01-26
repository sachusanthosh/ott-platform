var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const usersPerPage = 12;
  const totalUsers = 30; 
  const currentPage = parseInt(req.query.page || 1);
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  res.render('userList', {
    usersPerPage,
    totalUsers,
    currentPage,
    totalPages,
    title: 'Users',
  });
});


router.get('/details', function (req, res, next) {
  const limit = 12;
  const totalItems = 30; 
  const currentPage = parseInt(req.query.page || 1);
  const totalPages = Math.ceil(totalItems / limit);
  res.render('userDetails',{
    limit,
    totalItems,
    currentPage,
    totalPages,
  });
});

module.exports = router;
