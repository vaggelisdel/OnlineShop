var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_RmYiR9mDnMh06I85CqXyVpPd007X92HchW');
var items = require('../items');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    data: items
  });
});

router.post('/charge', function(req, res, next) {
  const amount = req.body.amount;
  const description = req.body.description;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
      .then(customer => stripe.charges.create({
        amount: amount,
        description: description,
        currency: 'eur',
        customer: customer.id
      }))
      .then(charge => res.render('success'));
});

module.exports = router;
