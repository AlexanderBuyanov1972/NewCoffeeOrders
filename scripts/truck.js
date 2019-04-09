(function (window) {
        let App = window.App || {};
        function Truck(id, orders) {
            this.id = id;
            this.orders = orders;
            Truck.prototype.createOrder = function (order){
                if (!order.emailAddress){
                    throw Error("Email not defined in order");
                }
                return this.orders.add(order.emailAddress, order);
            }

            Truck.prototype.deliverOrder = function (email) {
                const res = this.orders.remove(email);
                if (res) {
                    console.log("order has been delivered.");
                    return true;
                }
                return false;
            }
            Truck.prototype.printOrders = function () {
                console.log(`truck ${this.id} has following pending orders`);
                this.orders.getAll().forEach((o) => {
                    console.log(o);
                })
            }
        }
        App.Truck = Truck;
        window.App = App;
    }
)(window);