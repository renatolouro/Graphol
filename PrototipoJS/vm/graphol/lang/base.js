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

function strategy_Null() {
    this.exec = function() {
    }
    this.tonumber = function() {
    }
    this.tostring = function() {
    }
    this.getType = function() {
    }
}

function strategy_Factory(pValue) {
    var Strategy = null;

    if (pValue != null && typeof(pValue) == 'object') {
        if (pValue['getType'] != null) {
            if (pValue.getType() == "number")
                Strategy = new strategy_Number(pValue.tonumber());
            else if (pValue.getType() == "operator") {
                Strategy = new strategy_Number(null);
                Strategy.receive(pValue);
            }
            else
                Strategy = new strategy_String(pValue.tostring());
        }
        else if (pValue['tostring'] != null)
            Strategy = new strategy_String(pValue.tostring());
        else
            Strategy = new strategy_String(pValue.tostring());
    }
    else if (typeof(pValue) == 'string')
        Strategy = new strategy_String(pValue);
    else if (!isNaN(pValue))
        Strategy = new strategy_Number(pValue);
    else
        Strategy = new strategy_Null();

    return Strategy;
}