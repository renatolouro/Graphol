function strategy_String(pValue) {
    var p_mytype = "text";
    this.name = "";
    this.value = pValue;

    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['tostring'] != null)
                this.value += pValue.tostring();
            else
                this.value += pValue
        }
        else
            this.value += pValue;
    }

    this.tonumber = function() {
        if (isNaN(parseFloat(this.value)))
            return 0;
        return parseFloat(this.value);
    }

    this.tostring = function() {
        return this.value;
    }

    this.exec = function() {

    }

    this.getType = function() {
        return p_mytype;
    }
}