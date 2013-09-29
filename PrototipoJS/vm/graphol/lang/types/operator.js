function strategy_Operator(psSignal)
{
    var p_mytype = "operator";
    this.name = psSignal;
    this.value = null;
    this.receive = function(pValue) {
        var value = pValue;
        if (value != null && typeof(value) == 'object') {
            if (value['tonumber'] != null)
                value = value.tonumber();
            else if (value['tostring'] != null)
                value = parseFloat(value = value.tostring());
            else
                value = Number(value);
        }
        else if (value != null)
            value = parseFloat(pValue);
        if (!isNaN(value)) {
            if (this.value == null)
                this.value = value;
            else
                eval("this.value" + this.name + "=value;");
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