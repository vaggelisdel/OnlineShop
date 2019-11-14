var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    img: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);