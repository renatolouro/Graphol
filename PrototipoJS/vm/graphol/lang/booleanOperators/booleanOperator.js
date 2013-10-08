function strategy_BooleanOperator(psSignal)
{
    var p_mytype = "booleanOperator";
    this.name = psSignal;
    this.value = null;
    this.valueReference = null;
    
    this.receive = function(pValue) {        
        var nodoValue = pValue;
        if (this.value == null || typeof(this.value) != 'object') {
            nodoValue = new Nodo();
            nodoValue.receive(pValue);
        }
        if(this.valueReference==null) this.valueReference=nodoValue;
        else {
            eval("this.value = (this.valueReference.toboolean() "+this.name+" nodoValue.toboolean());");
        }
    }
    this.toboolean = function() {
        return this.value;
    }
    this.tonumber = function() {
        if(this.value) return 1; else return 0;
    }
    this.tostring = function() {
        return "" + this.value;
    }
    this.exec = function() {
    }
    this.getType = function() {
        return p_mytype;
    }
    this.getValue = function() {
        return this.value;
    }
}