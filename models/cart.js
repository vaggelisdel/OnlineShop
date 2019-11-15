module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        var singlePrice = 0;
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = parseFloat(storedItem.item.price * storedItem.qty).toFixed(2) ;
        this.totalQty++;
        singlePrice += storedItem.item.price;
        this.totalPrice = parseFloat(parseFloat(this.totalPrice) + parseFloat(singlePrice)).toFixed(2);
    };

    this.reduceitem = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        var y = 0;
        y += this.items[id].item.price;
        this.totalPrice = parseFloat(parseFloat(this.totalPrice) - parseFloat(y)).toFixed(2);

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.increaseitem = function (id) {
        this.items[id].qty++;
        var totalItemPrice = 0;
        totalItemPrice += this.items[id].item.price;
        this.items[id].price = parseFloat(parseFloat(this.items[id].price) + parseFloat(totalItemPrice)).toFixed(2);
        this.totalQty++;
        var y = 0;
        y += this.items[id].item.price;
        this.totalPrice = parseFloat(parseFloat(this.totalPrice) + parseFloat(y)).toFixed(2);
    };

    this.removeSignleItem = function (id) {
        this.totalQty -= this.items[id].qty;
        var x = 0;
        x += this.items[id].price;
        this.totalPrice = parseFloat(parseFloat(this.totalPrice) - parseFloat(x)).toFixed(2);
        delete this.items[id];
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) arr.push(this.items[id]);
        return arr;
    }
};