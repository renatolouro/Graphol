function strategy_Boolean(pValue) {
    var p_mytype = "boolean";
    this.value = pValue;

    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['toBoolean'] != null)
                this.value = pValue.toBoolean();
            else
                this.value = false;
        }
        else if (pValue != null) this.value = this.value && pValue;
        else this.value = pValue;
    }

    this.exec = function() {
    }

    this.getType = function() {
        return p_mytype;
    }
    
    this.getMessage = function() {

    }
    this.toboolean = function() {
        return this.value;
    }
    this.getValue = function() {
        return this.value;
    }
}