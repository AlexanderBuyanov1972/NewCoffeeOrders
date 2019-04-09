(
    function (window) {
        let App = window.App || {}
        let $ = window.jQuery;

        //constructor row that will get order
        function Row(order) {
            let $div = $('<div></div>', {class: 'form-check', 'data-coffee-order': "checkbox"});
            let $label = $('<label></label>', {class: 'form-check-label'});
            let $input = $('<input>', {type: 'checkbox', class: 'form-check-input', value: order.emailAddress});
            let content = `${order.emailAddress},${order.coffee},${order.size},${order.flavor},${order.strength}`;
            $label.append($input).append(content);
            $div.append($label);
            this.$rowElement = $div;
        }

        //constructor checklist that will get selector
        function CheckList(selector) {

            this.$checkListElement = $(selector);

            CheckList.prototype.addRow = function (order) {
                let row = new Row(order);
                this.$checkListElement.append(row.$rowElement);
            }

            CheckList.prototype.addHandler = function (fn) {
                this.$checkListElement.on('click', 'input', function (event) {
                    event.preventDefault();
                    let emailAddress = event.target.value;
                    fn(emailAddress);
                })
            }

            CheckList.prototype.removeRow = function (emailAddress) {
                let $element = this.$checkListElement.find(`[value = "${emailAddress}"]`)
                    .closest('[data-coffee-order="checkbox"]').remove();
            }
        }

        App.CheckList = CheckList;
        window.App = App;
    }
)(window)