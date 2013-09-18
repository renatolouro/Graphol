function Echo() {
    var p_mytype = "command";
    var arrRec = new Array();

    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['tostring'] != undefined)
                arrRec[arrRec.length] = pValue.tostring();
            else
                arrRec[arrRec.length] = pValue
        }
        else
            arrRec[arrRec.length] = pValue;
    }

    this.exec = function(pValue) {
        for (var i = 0; i < arrRec.length; i++)
            alert(arrRec[i]);
        arrRec = new Array()
    }

    this.getType = function() {
        return p_mytype;
    }
}