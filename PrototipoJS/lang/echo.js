function Echo() {
    var p_mytype = "command";

    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['tostring'] != undefined)
                alert(pValue.tostring());
            else
                alert(pValue);
        }
        else
            alert(pValue);
    }

    this.exec = function() {
    }

    this.getType = function() {
        return p_mytype;
    }
}