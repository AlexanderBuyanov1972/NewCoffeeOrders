(function (window) {
        let App = window.App || {};

        function Truck(id, orders) {
            this.id = id;
            this.orders = orders;
            Truck.prototype.createOrder = function (order) {
                if (!order.emailAddress) {
                    throw Error("Email not defined in order");
                }
                return this.orders.add(order.emailAddress, order);
            }

            Truck.prototype.deliverOrder = function (emailAddress) {
                return this.orders.remove(emailAddress);
            }
            Truck.prototype.printOrders = function () {
                console.log(`truck ${this.id} has following pending orders`);
                this.orders.getAll().then(function (orders) {
                    Object.values(orders).forEach(function (order) {
                        console.log(order);
                    })
                })
            }
        }

        App.Truck = Truck;
        window.App = App;
    }
)(window);