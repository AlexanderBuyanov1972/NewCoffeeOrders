let orders = new App.RemoteDataStore('https://coffeetelran.herokuapp.com');
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
    event.preventDefault();
    return truck.orders.get(emailAddress) ? "email address already exists" : "";

});


