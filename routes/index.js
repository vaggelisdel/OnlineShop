var express = require('express');
var router = express.Router();

var HomeController = require('../controllers/Home');
var CartController = require('../controllers/Cart');

router.get('/', function (req, res, next) {
    HomeController.index(req, res, next);
});

router.get('/add-to-card/:id', function (req, res, next) {
    CartController.addToCard(req, res, next);
});

router.get('/shopping-cart', function (req, res, next) {
    CartController.shoppingCart(req, res, next);
});

router.get('/checkout', isLoggedIn, function (req, res, next) {
    CartController.getCheckout(req, res, next);
});

router.post('/checkout', isLoggedIn, function (req, res, next) {
    CartController.postCheckout(req, res, next);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
module.exports = router;
