(
    function (window) {
        let App = window.App || {};
        let $ = window.jQuery;
        function FormHandler(selector) {
            this.$formElement = $(selector);
            if (!this.$formElement) {
                throw Error("wrong selector");
            }
            if (this.$formElement.length ===0) {
                throw Error("does not look as a form");
            }

            FormHandler.prototype.addHandler = function (fn) {
                this.$formElement.on('submit', function (event) {
                        event.preventDefault();
                        const data = {};
                        $(this).serializeArray().forEach(function (item) {
                            data[item.name] = item.value;
                        })
                        console.log(data);
                    fn(data);
                    this.reset();
                    this.elements[0].focus();
                    }
                );
            }
        }
        App.FormHandler = FormHandler;
        window.App = App;
    })(window)