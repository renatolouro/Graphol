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
            if (pValue.getType() == "block")
                Strategy = pValue;
            else if (pValue.getType() == "boolean")
                Strategy = new strategy_Boolean(pValue.toBoolean());
            else if (pValue.getType() == "number")
                Strategy = new strategy_Number(pValue.tonumber());
            else if (pValue.getType() == "operator") {
                Strategy = new strategy_Number(null);
                Strategy.receive(pValue);
            } else if (pValue.getType() == "logicOperator")
                Strategy = pValue;
            else if (pValue.getType() == "booleanOperator")
                Strategy = pValue;
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
    else if (typeof(pValue) == 'boolean')
        Strategy = new strategy_Boolean(pValue);
    else if (!isNaN(pValue))
        Strategy = new strategy_Number(pValue);
    else
        Strategy = new strategy_Null();

    return Strategy;
}