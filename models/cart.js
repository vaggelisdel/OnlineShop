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
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        singlePrice += storedItem.item.price;
        this.totalPrice = parseFloat(parseFloat(this.totalPrice) + parseFloat(singlePrice)).toFixed(2);
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) arr.push(this.items[id]);
        return arr;
    }
};

// module.exports = function Cart(oldCart) {
//     this.items = oldCart.items || {};
//     this.totalQty = oldCart.totalQty || 0;
//     this.finalPrice = oldCart.finalPrice || 0;
//     this.totalPrice = parseFloat(this.finalPrice).toFixed(2);
//
//     this.add = function (item, id) {
//         var storedItem = this.items[id];
//         if (!storedItem) {
//             storedItem = this.items[id] = {item: item, qty: 0, price: 0};
//         }
//         storedItem.qty++;
//         storedItem.price = storedItem.item.price * storedItem.qty;
//         this.totalQty++;
//         this.finalPrice += storedItem.item.price;
//     };
//
//     this.generateArray = function () {
//         var arr = [];
//         for (var id in this.items) arr.push(this.items[id]);
//         return arr;
//     }
// };