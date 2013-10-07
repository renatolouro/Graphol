function strategy_LogicalOperator(psSignal)
{
    var p_mytype = "logicOperator";
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
            if(this.valueReference.getType()!=nodoValue.getType()) this.value = false;
            else if(this.value===null) eval("this.value = (this.valueReference.getValue() "+this.name+" nodoValue.getValue());");
            else eval("this.value = (this.value && (this.valueReference.getValue() "+this.name+" nodoValue.getValue()))");
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