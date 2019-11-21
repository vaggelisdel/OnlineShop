module.exports = {
    index: function(req, res, next) {
        var successMsg = req.flash('success')[0];
        res.render('index', {
            title: 'Tech eShop',
            successMsg: successMsg,
            noMessages: !successMsg
        });
    }
};