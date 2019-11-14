var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
const {check, validationResult} = require('express-validator');
var UserController = require('../controllers/User');


var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', requiredLogin, function (req, res, next) {
    UserController.profile(req, res, next);
});

router.get('/logout', requiredLogin, function (req, res, next) {
    UserController.userlogout(req, res, next);
});

router.use('/', notRequiredLogin, function (req, res, next) {
    next();
});

router.get('/signup', function (req, res, next) {
    UserController.getSignUp(req, res, next);
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    UserController.postSignUp(req, res, next);
});

router.get('/signin', function (req, res, next) {
    UserController.getSignIn(req, res, next);
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    UserController.postSignIn(req, res, next);
});

module.exports = router;

function requiredLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
function notRequiredLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}