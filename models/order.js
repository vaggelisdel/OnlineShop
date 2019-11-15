var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymentId: {type: String, required: true},
    timestamp: {type: String, default: moment(Date.now()).format('YYYY-DD-MM HH:mm:ss')}
});

module.exports = mongoose.model('Order', schema);