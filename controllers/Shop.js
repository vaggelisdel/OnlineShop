var Product = require('../models/product');

module.exports = {
    index: function(req, res, next) {
        var successMsg = req.flash('success')[0];
        Product.find(function (err, docs) {
            res.render('shop/index', {
                title: 'Tech eShop',
                products: docs,
                successMsg: successMsg,
                noMessages: !successMsg
            });
        });
    }
};