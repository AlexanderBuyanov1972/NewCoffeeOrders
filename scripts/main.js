let orders = new App.Orders();
let truck = new App.Truck(1, orders);
let formHandler = new App.FormHandler('[data-coffee-order = "form"]');
formHandler.addHandler(function (order) {
    truck.createOrder(order)
});