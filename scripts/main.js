//let orders = new App.Orders();
let orders = new App.RemoteDataStore('https://coffeetelran.herokuapp.com');
let truck = new App.Truck(1, orders);
let formHandler = new App.FormHandler('[data-coffee-order="form"]');
let checkList = new App.CheckList('[data-coffee-order="checklist"]');

formHandler.addHandler(function (order) {
    return truck.createOrder(order).then(function (res) {
        if (res)
            checkList.addRow(order);
    })
});

checkList.addHandler(function (email) {
    truck.deliverOrder(email).then(function (res) {
        if (res)
            checkList.removeRow(email);
    }).catch(function () {
        alert("Server is not available");
    })


});
formHandler.addEmailHandler(function (email) {
    return orders.get(email) ? "email already exists..." : "";
});

let lastOrders = {};

function displayAll() {
    orders.getAll().then(function (orders) {
        if (JSON.stringify(lastOrders) !== JSON.stringify(orders)) {
            checkList.removeAllRow();
            Object.values(orders).forEach(function (order) {
                checkList.addRow(order);
                lastOrders = {...orders};
            })
        }
    });
}

displayAll();
setInterval(displayAll, 5000);


