(function (window) {
        let App = window.App || {};

        function Orders() {
            this.data = {};

            Orders.prototype.add = function (email, order) {
                if (this.data[email]) {
                    return false;
                }
                this.data[email] = order;
                return true;
            }

            Orders.prototype.get = function (email) {
                if (this.data[email]) {
                    return this.data[email];
                }
                return false;
            }

            Orders.prototype.remove = function (email) {
                if (this.data[email]) {
                    delete this.data[email];
                    return true;
                }
                return false;
            }
            Orders.prototype.getAll = function () {
                return Object.values(this.data);
            }
        }

        App.Orders = Orders;
        window.App = App;
    }
)(window);