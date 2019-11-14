var Order = require('../models/order');
var Cart = require('../models/cart');

module.exports = {
    profile: function (req, res, next) {
        Order.find({user: req.user}, function (err, orders) {
            if (err) {
                return res.write('Error!');
            }
            var cart;
            orders.forEach(function (order) {
                cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
            res.render('user/profile', {orders: orders});
        });
    },
    userlogout: function (req, res, next) {
        req.logout();
        res.redirect('/');
    },
    getSignUp: function (req, res, next) {
        var messages = req.flash('error');
        res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
    },
    postSignUp: function (req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/user/profile');
        }
    },
    getSignIn: function (req, res, next) {
        var messages = req.flash('error');
        res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
    },
    postSignIn: function (req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/user/profile');
        }
    }
};