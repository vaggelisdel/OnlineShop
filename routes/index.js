var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/Home');
var CartController = require('../controllers/Cart');

//index page
router.get('/', function (req, res, next) {
    HomeController.index(req, res, next);
});

//add to card with get
router.post('/add-to-cart', function (req, res, next) {
    CartController.addToCart(req, res, next);
});

//reduce one item
router.post('/reduceone', function (req, res, next) {
    CartController.reduceByOne(req, res, next);
});

//increase one item
router.post('/increaseone', function (req, res, next) {
    CartController.increaseByOne(req, res, next);
});

//remove all quantities from item
router.get('/removeitem/:id', function (req, res, next) {
    CartController.removeitem(req, res, next);
});

//shopping cart with get
router.get('/shopping-cart', function (req, res, next) {
    CartController.shoppingCart(req, res, next);
});

//checkout the order with get
router.get('/checkout', isLoggedIn, function (req, res, next) {
    CartController.getCheckout(req, res, next);
});

//checkout the order with post
router.post('/checkout', isLoggedIn, function (req, res, next) {
    CartController.postCheckout(req, res, next);
});

//check login function
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}

module.exports = router;
