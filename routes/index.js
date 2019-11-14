var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'Shopping Cart',
            products: productChunks,
            successMsg: successMsg,
            noMessages: !successMsg
        });
    });
});

router.get('/add-to-card/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, productId);
        req.session.cart = cart;
        // console.log(req.session.cart);
        res.redirect('/');
    })
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice.toFixed(2)});
});

router.get('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice.toFixed(2), errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        process.env.SECURITY_KEY_STRIPE
    );

    stripe.charges.create({
        amount: cart.totalPrice.toFixed(2) * 100,
        currency: "eur",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function (err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        req.flash('success', 'Successfully bought product!');
        req.session.cart = null;
        res.redirect('/');
    });
});

// router.get('/add', function (req, res, next) {
//   var request = require("request");
//   request.get('https://api.myjson.com/bins/1a996e', {json: true}, (error, response, body) => {
//     if (error) {
//       console.error(error);
//       return
//     }
//     var data = JSON.stringify(body);
//     var objects = JSON.parse(data);
//
//     for (var i = 0, len = objects.length; i < len; i++) {
//           var row = objects[i];
//           const productItem = new Product(row);
//           productItem.save().then(
//               data=> {console.log("Insert...")}
//           ).catch(err=>{
//             throw err;
//           })
//         }
//      console.log("Completed!");
//   })
// });

module.exports = router;
