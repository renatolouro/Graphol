function strategy_Boolean() {
    var p_mytype = "boolean";
    this.value = false;

    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['toBoolean'] != null)
                this.value = pValue.toBoolean();
            else
                this.value = false;
        }
        else if (pValue != null) this.value += pValue;
        else this.value = false;
    }

    this.exec = function() {
    }

    this.getType = function() {
        return p_mytype;
    }
    
        this.getMessage = function() {

        }
}