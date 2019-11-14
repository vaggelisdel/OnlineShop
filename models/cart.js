module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        var finalPrice = 0;
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        finalPrice += storedItem.item.price;
        this.totalPrice = finalPrice.toFixed(2);
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) arr.push(this.items[id]);
        return arr;
    }
};