(
    function (window) {
        let App = window.App || {}
        let $ = window.jQuery;

        function RemoteDataStore(url) {
            if (!url) {
                throw Error("URL is not defined.")
            }
            this.serverUrl = url;

            RemoteDataStore.prototype.add = function (key, order) {
                $.ajax({
                    //url: this.serverUrl + '/order/add',
                    url: this.serverUrl + '/create',
                    type: 'POST',
                    data: JSON.stringify(order),
                    contentType: 'application/json',
                    success: function (response) {
                        console.log(response);
                    }
                });
                return true;
            }

            RemoteDataStore.prototype.remove = function (emailAddress) {
                $.ajax({
                    //url: this.serverUrl + '/order/remove?emailAddress=' + emailAddress,
                    url: this.serverUrl + '/delete?emailAddress=' + encodeURIComponent(emailAddress),
                    type: 'DELETE',
                    success: function (response) {
                        console.log(response);
                    }
                });
                return true;
            }

            RemoteDataStore.prototype.getAll = function (cb) {
                $.ajax({
                   // url: this.serverUrl + '/orders',
                    url: this.serverUrl + '/getAll',
                    type: 'GET',
                    success: function (response) {
                        cb(response);
                    }
                });

            }

            RemoteDataStore.prototype.get = function (emailAddress) {
                let res;
                $.ajax({
                    //url: this.serverUrl + '/order/get?emailAddress=' + emailAddress,
                    url: this.serverUrl + '/get?emailAddress=' + encodeURIComponent(emailAddress),
                    async:false,
                    type: 'GET',
                    success: function (response) {
                        res=response;
                    }
                });
                return res;
            }


        }

        App.RemoteDataStore = RemoteDataStore;
        window.App = App;
    }
)(window)