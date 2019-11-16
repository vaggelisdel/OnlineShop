$(function() {

    var owner = $('#owner');
    var cardNumber = $('#cardNumber');
    var cardNumberField = $('#card-number-field');
    var CVV = $("#cvv");
    var confirmButton = $('#confirm-purchase');
    var detected_card = $("#detect_card");

    var visa = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg';
    var mastercard = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png';
    var amex = 'https://paymentweek.com/wp-content/uploads/2015/10/American-Express-copy.png';
    var discover = 'https://i2.wp.com/www.9southvapes.com/wp-content/uploads/2019/05/discover-credit-card-logo-transparent.jpg?fit=900%2C640&ssl=1';
    var empty = 'https://support.lenovo.com/esv4/images/loading.gif';

    var iconheight = CVV.height();
    detected_card.css('height', iconheight+"px");

    // Use the payform library to format and validate
    // the payment fields.

    cardNumber.payform('formatCardNumber');
    CVV.payform('formatCardCVC');


    cardNumber.keyup(function() {

        if ($.payform.validateCardNumber(cardNumber.val()) == false) {
            cardNumberField.addClass('has-error');
        } else {
            cardNumberField.removeClass('has-error');
            cardNumberField.addClass('has-success');
        }

        if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
            detected_card.attr('src', visa);
        } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
            detected_card.attr('src', amex);
        } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
            detected_card.attr('src', mastercard);
        } else if ($.payform.parseCardType(cardNumber.val()) == 'discover') {
            detected_card.attr('src', discover);
        } else if ($.payform.parseCardType(cardNumber.val()) == null) {
            detected_card.attr('src', empty);
        }
    });

    confirmButton.click(function(e) {

        e.preventDefault();

        var isCardValid = $.payform.validateCardNumber(cardNumber.val());
        var isCvvValid = $.payform.validateCardCVC(CVV.val());

        if(owner.val().length < 5){
            alert("Wrong owner name");
        } else if (!isCardValid) {
            alert("Wrong card number");
        } else if (!isCvvValid) {
            alert("Wrong CVV");
        } else {
            // Everything is correct. Add your form submission code here.
            alert("Everything is correct");
        }
    });
});