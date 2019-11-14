var Product = require('../models/product');

module.exports = {
    index: function(req, res, next) {
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
    }
};