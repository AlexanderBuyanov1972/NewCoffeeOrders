(
    function (window) {
        let App = window.App || {};

        function Orders() {
            this.data = {};
        }

        Orders.prototype.add = function (email, order) {
            let result = this.data[email];
            if (!result) {
                this.data[email] = order;
                return true;
            }
            return false;
        }

        Orders.prototype.get = function (email) {
            let result = this.data[email];
            if (result) {
                return result;
            }
            return "";
        }
        Orders.prototype.remove = function (email) {
            let result = this.data[email];
            if (result) {
                delete this.data[email];
                return true;
            }
            return false;
        }
        Orders.prototype.getAll = function () {
            return Object.values(this.data);
        }

        Orders.prototype.removeAll = function(){
            return this.data = {};
        }
        App.Orders = Orders;
        window.App = App;
    }
)(window)
