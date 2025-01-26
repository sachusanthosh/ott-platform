var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    const limit = 15;
    const totalItems = 30; 
    const currentPage = parseInt(req.query.page || 1);
    const totalPages = Math.ceil(totalItems / limit);
    res.render('report',{
      limit,
      totalItems,
      currentPage,
      totalPages,
    });
  });
  module.exports = router;
