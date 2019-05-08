(
    function (window) {
        let App = window.App || {};
        let $ = window.jQuery;

        function Row(order) {
            let $div = $('<div></div>', {
                class: 'form-check',
                'data-coffee-order': "checkbox"
            });
            let $label = $('<label></label>', {
                class: 'form-check-label'
            });

            let $input = $('<input>', {
                type: "checkbox",
                class: "form-check-input",
                value: order.email
            });
            let content = `${order.email},${order.coffee},${order.size},${order.flavor},${order.strength}`;
            $label.append($input).append(content);
            $div.append($label);
            this.$rowElement = $div;
        }

        function CheckList(selector) {
            this.$checkList = $(selector);
            if (!this.$checkList) {
                throw Error('Wrong selector');
            }
            if (this.$checkList.length == 0) {
                throw Error('Selector does not look as check list.');
            }
        }

        CheckList.prototype.addHandler = function (fn) {
            this.$checkList.on('click', 'input', function (event) {
                event.preventDefault();
                let email = event.target.value;
                fn(email);
            });
        }

        CheckList.prototype.addRow = function (order) {
            let row = new Row(order);
            this.$checkList.append(row.$rowElement);
        }

        CheckList.prototype.removeRow = function (email) {
            this.$checkList.find(`[value="${email}"]`).closest("[data-coffee-order='checkbox']").remove();
        }

        CheckList.prototype.removeAllRow = function () {
            this.$checkList.empty();
        }

        App.CheckList = CheckList;
        window.App = App;
    }
)(window)
