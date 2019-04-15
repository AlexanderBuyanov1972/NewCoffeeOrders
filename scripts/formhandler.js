(
    function (window) {
        let App = window.App || {};
        let $ = window.jQuery;

        function FormHandler(selector) {
            this.$formElement = $(selector);
            if (!this.$formElement) {
                throw Error("wrong selector");
            }
            if (this.$formElement.length === 0) {
                throw Error("does not look like a form");
            }

            FormHandler.prototype.addHandler = function (fn) {
                this.$formElement.on('submit', function (event) {
                        event.preventDefault();
                        const data = {};
                        $(this).serializeArray().forEach(function (item) {
                            data[item.name] = item.value;
                        })
                        fn(data).then(function () {
                            this.reset();
                            this.elements[0].focus();
                        }.bind(this)).catch(function () {
                            alert("Server is not available.");
                        });
                    }
                );
            }


            FormHandler.prototype.addEmailHandler = function (fn) {
                this.$formElement.on('input', '[data-coffee-role="email"]', function (event) {
                    this.setCustomValidity(fn(this.value));
                })
            }
        }

        App.FormHandler = FormHandler;
        window.App = App;
    })(window)