var express = require('express');
var router = express.Router();

var IndexController = require('../controllers/Index');

//index page
router.get('/', function (req, res, next) {
    IndexController.index(req, res, next);
});

module.exports = router;
