(
    function (window) {
        let App = window.App || {};

        function Orders() {
            this.data = {};
        }

        function createPromise(value) {
            return new Promise(function (resolve, reject) {
                resolve(value)
            })
        }

        Orders.prototype.add = function (email, order) {
            if (this.data[email]) {
                return createPromise(false);
            }
            this.data[email] = order;
            return createPromise(true);
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
        Orders.prototype.get = function (email) {
            return this.data[email];
        }
        Orders.prototype.removeAll = function () {
            this.data = {};
            return createPromise(true);
        }

        //
        // Orders.prototype.add = function (email, order) {
        //     let result = this.data[email];
        //     if (!result) {
        //         this.data[email] = order;
        //         return true;
        //     }
        //     return false;
        // }
        //
        // Orders.prototype.get = function (email) {
        //     let result = this.data[email];
        //     if (result) {
        //         return result;
        //     }
        //     return "";
        // }
        // Orders.prototype.remove = function (email) {
        //     let result = this.data[email];
        //     if (result) {
        //         delete this.data[email];
        //         return true;
        //     }
        //     return false;
        // }
        // Orders.prototype.getAll = function () {
        //     return Object.values(this.data);
        // }
        //
        // Orders.prototype.removeAll = function(){
        //     return this.data = {};
        // }
        App.Orders = Orders;
        window.App = App;
    }
)(window)
