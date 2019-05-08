(
    function (window) {
        let App = window.App || {};
        let $ = window.jQuery;

        function RemoteDataStore(url) {
            if (!url)
                throw Error('Url is not defined');
            this.serverUrl = url;
        }

        RemoteDataStore.prototype.add = function (email, order) {
            return $.ajax({
                url: this.serverUrl + '/order/add',
                type: 'POST',
                data: JSON.stringify(order),
                contentType: 'application/json'
            });
        }

        RemoteDataStore.prototype.remove = function (email) {
            return $.ajax({
                url: this.serverUrl + '/order/remove?email = ' + encodeURIComponent(email),
                type: 'DELETE'
            });
        }

        RemoteDataStore.prototype.getAll = function () {
            return $.getJSON(this.serverUrl + '/orders');
        }

        RemoteDataStore.prototype.get = function (email) {
            let result;
            $.ajax({
                url: this.serverUrl + '/order/get?email=' + encodeURIComponent(email),
                async: false,
                success: function (res) {
                    result = res;
                }
            });
            return result;
        }


        App.RemoteDataStore = RemoteDataStore;
        window.App = App;
    }
)(window)
