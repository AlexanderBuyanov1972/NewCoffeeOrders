(
    function (window) {
        let App = window.App || {};
        let $ = window.jQuery;

        function FormHandler(selector) {
            this.$formElement = $(selector);
            if (!this.$formElement) {
                throw Error('Wrong selector');
            }
            if (this.$formElement.length == 0) {
                throw Error('Selector does not look as form.');
            }
        }

        FormHandler.prototype.addHandler = function (fn) {
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                const data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                })
                fn(data);
                this.reset();
                this.elements[0].focus();
            });
        }
        FormHandler.prototype.addEmailHandler = function(fn){
            this.$formElement.on('input','[data-coffee-role="email"]', function (event) {
                this.setCustomValidity(fn(this.value));
            });
        }

        App.FormHandler = FormHandler;
        window.App = App;
    }
)(window)
