var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
  });
});

router.get('/add-to-card/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err){
      return res.redirect('/');
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })
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
