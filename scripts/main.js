(function (window) {
    let App = window.App || {}
//let orders = new App.RemoteDataStore('https://servercoffeeorders.herokuapp.com');
//let orders = new App.RemoteDataStore('http://localhost:9000');
    let orders = new App.Orders();
    let truck = new App.Truck(1, orders);
    let formHandler = new App.FormHandler('[data-coffee-order = "form"]');
    let checkList = new App.CheckList('[data-coffee-order="checklist"]');

    formHandler.addHandler(function (order) {
        return truck.createOrder(order).then(function (response) {
            if (response) {
                checkList.addRow(order);
            }
        });
    });


    checkList.addHandler(function (emailAddress) {
        truck.deliverOrder(emailAddress).then(function (response) {
            if (response) {
                checkList.removeRow(emailAddress);
            }
        }).catch(function () {
            alert("Server is not available");
        });
    });

    formHandler.addEmailHandler(function (emailAddress) {
        return orders.get(emailAddress) ? "email address already exists" : "";
    });


    let lastOrders = {};

    function displayAll() {
        orders.getAll().then(function (orders) {
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

    window.App = App;
})(window)