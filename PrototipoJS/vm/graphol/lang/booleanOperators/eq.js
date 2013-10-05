function strategy_Equals()
{
    var p_mytype = "booleanOperator";
    this.name = "=";
    this.value = null;
    this.valueReference = null;
    
    this.receive = function(pValue) {        
        var nodoValue = pValue;
        if (value == null || typeof(value) != 'object') {
            nodoValue = new Nodo();
            nodoValue.receive(pValue);
        }
        if(this.valueReference==null) this.valueReference=nodoValue;
        else {
            if(this.getType()!=pNodo.getType()) this.value = this.value && false;
            else this.value = (this.value && (this.getValue() == pNodo.getValue()));
        }
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