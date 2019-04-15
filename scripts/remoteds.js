(
    function (window) {
        let App = window.App || {}
        let $ = window.jQuery;

        function RemoteDataStore(url) {
            this.serverUrl = url;

            if (!url) {
                throw Error("URL is not defined.")
            }

            RemoteDataStore.prototype.add = function (order) {
                return $.ajax({
                    url: this.serverUrl + '/create',
                    type: 'POST',
                    data: JSON.stringify(order),
                    contentType: 'application/json'
                });
            }

            RemoteDataStore.prototype.remove = function (emailAddress) {
                return $.ajax({
                    url: this.serverUrl + '/delete?emailAddress=' + encodeURIComponent(emailAddress),
                    type: 'DELETE'
                });
            }

            RemoteDataStore.prototype.getAll = function (cb) {
                return $.getJSON(this.serverUrl + '/getAll', function (response) {
                    cb(response);
                });
            }

            RemoteDataStore.prototype.get = function (emailAddress) {
                let res;
                $.ajax({
                    url: this.serverUrl + '/get?emailAddress=' + encodeURIComponent(emailAddress),
                    async: false,
                    type: 'GET',
                    success: function (response) {
                        res = response;
                    }
                });
                return res;
            }
        }

        App.RemoteDataStore = RemoteDataStore;
        window.App = App;
    }
)(window)