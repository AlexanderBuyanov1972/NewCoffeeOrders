let orders = new App.RemoteDataStore('https://servercoffeeorders.herokuapp.com');
let truck = new App.Truck(1, orders);
let formHandler = new App.FormHandler('[data-coffee-order = "form"]');
let checkList = new App.CheckList('[data-coffee-order="checklist"]');

formHandler.addHandler(function (order) {
    if (truck.createOrder(order)) {
        checkList.addRow(order);
    }
});

checkList.addHandler(function (emailAddress) {
    truck.deliverOrder(emailAddress);
    checkList.removeRow(emailAddress);
});

formHandler.addEmailHandler(function (emailAddress) {
    return orders.get(emailAddress) ? "email address already exists" : "";

});
let lastOrders = {};

function displayAll() {
    orders.getAll(function (orders) {
        if (JSON.stringify(lastOrders) !== JSON.stringify(orders)) {
            checkList.removeAll();
            Object.values(orders).forEach(function (order) {
                checkList.addRow(order);
            })
            lastOrders = {...orders};
        }
     })
}

displayAll();


setInterval(function () {
    displayAll(), 5000
});


