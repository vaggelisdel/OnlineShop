var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

module.exports = {
    addToCart: function (req, res, next) {
        var productId = req.body.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        Product.findById(productId, function (err, product) {
            if (err) {
                return res.redirect('/');
            }
            cart.add(product, productId);
            req.session.cart = cart;
            // console.log(req.session.cart);
            res.send({"total": req.session.cart.totalQty});
        });
    },
    reduceByOne: function (req, res, next) {
        var productId = req.body.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.reduceitem(productId);
        req.session.cart = cart;
        res.send({
            "total": req.session.cart.totalQty,
            "curItemQty": cart.totalQty,
            "totalPrice": cart.totalPrice,
            "curTotalPrice": cart.items[productId].price
        });
    },
    increaseByOne: function (req, res, next) {
        var productId = req.body.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.increaseitem(productId);
        req.session.cart = cart;
        res.send({
            "total": req.session.cart.totalQty,
            "curItemQty": cart.totalQty,
            "totalPrice": cart.totalPrice,
            "curTotalPrice": cart.items[productId].price
        });
    },
    removeitem: function (req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.removeSignleItem(productId);
        req.session.cart = cart;
        res.redirect('/shop/shopping-cart');
    },
    shoppingCart: function (req, res, next) {
        if (!req.session.cart) {
            return res.render('shop/shopping-cart', {products: null});
        }
        var cart = new Cart(req.session.cart);
        res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
    },
    getCheckout: function (req, res, next) {
        if (!req.session.cart) {
            return res.redirect('/shopping-cart');
        }
        var cart = new Cart(req.session.cart);
        var errMsg = req.flash('error')[0];
        res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
    },
    postCheckout: function (req, res, next) {
        if (!req.session.cart) {
            return res.redirect('/shopping-cart');
        }
        var cart = new Cart(req.session.cart);

        var stripe = require("stripe")(
            process.env.SECURITY_KEY_STRIPE
        );

        stripe.charges.create({
            amount: cart.totalPrice * 100,
            currency: "eur",
            source: req.body.stripeToken, // obtained with Stripe.js
            description: "Test Charge"
        }, function (err, charge) {
            if (err) {
                req.flash('error', err.message);
                return res.redirect('/checkout');
            }
            var order = new Order({
                user: req.user,
                cart: cart,
                address: req.body.address,
                name: req.body.name,
                paymentId: charge.id
            });
            order.save(function (err, result) {
                req.flash('success', 'Successfully bought product!');
                req.session.cart = null;
                res.redirect('/');
            });
        });
    }
};