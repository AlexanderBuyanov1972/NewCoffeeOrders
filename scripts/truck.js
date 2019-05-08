(
    function (window) {
        let App = window.App || {};

        function Truck(id, orders) {
            this.id = id;
            this.orders = orders;
        }

        Truck.prototype.createOrder = function (order) {
            if (!order.email) {
                throw Error('Email is not defined in order.');
            }
            return this.orders.add(order.email, order);
        }

        Truck.prototype.deliverOrder = function (email) {
            return this.orders.remove(email);
        }

        Truck.prototype.printOrders = function () {
            console.log(`Truck id=${this.id} has following pending orders`);
            this.orders.getAll(function (orders) {
                Object.values(orders).forEach(function (order) {
                    console.log(order);
                })
            });
        }

        App.Truck = Truck;
        window.App = App;
    }
)(window)
