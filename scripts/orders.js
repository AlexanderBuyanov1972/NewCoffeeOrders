(function (window) {
        let App = window.App || {};
        function Orders() {
            this.data = {};

            function createPromise(value){
                return new Promise(function (resolve) {
                    resolve(value);
                })
            }

            Orders.prototype.add = function (email, order) {
                if (this.data[email]) {
                    return createPromise(false);
                }
                this.data[email] = order;
                return createPromise(true);
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
                    return createPromise(true);
                }
                return createPromise(false);
            }
            Orders.prototype.getAll = function () {
                return createPromise(Object.values(this.data));
            }
        }
        App.Orders = Orders;
        window.App = App;
    }
)(window);