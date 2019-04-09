let orders = new App.Orders();
let truck = new App.Truck(1, orders);
let formHandler = new App.FormHandler('[data-coffee-order = "form"]');
let checkList = new App.CheckList('[data-coffee-order="checklist"]');
formHandler.addHandler(function (order) {
    truck.createOrder(order);
    checkList.addRow(order);
});
checkList.addHandler(function (emailAddress) {
    truck.deliverOrder(emailAddress);
    checkList.removeRow(emailAddress);
})

