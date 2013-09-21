function strategy_Number(pValue) {
    var p_mytype = "number";
    this.name = "";
    this.value = pValue;
    this.strategy = new strategy_Operator("+");
    if (pValue)
        this.strategy.receive(this.value);

    this.receive = function(pValue) {
        var value = pValue;
        if (pValue == "+" || pValue == "-" || pValue == "/" || pValue == "*") {
            this.value = this.strategy.tonumber();
            this.strategy = new strategy_Operator(pValue);
            this.strategy.receive(this.value);
            return;
        }
        if (value != null && typeof(value) == 'object') {
            if (value.getType() == "operator") {
                this.strategy = value;
                this.strategy.receive(this.value);
                this.value = this.strategy.tonumber();
                return;
            }
            else if (value['tonumber'] != null)
                value = value.tonumber();
            else if (value['tostring'] != null)
                value = parseFloat(value = value.tostring());
            else
                value = Number(value);
        }
        else if (value != null)
            value = parseFloat(pValue);

        if (!isNaN(value)) {
            this.strategy.receive(value);
            this.value = this.strategy.tonumber();
        }
        return;
    }

    this.tonumber = function() {
        return this.value;
    }

    this.tostring = function() {
        return "" + this.value;
    }

    this.exec = function() {

    }

    this.getType = function() {
        return p_mytype;
    }
}