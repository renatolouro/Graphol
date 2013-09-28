function Nodo() {
    var Strategy = null;

    this.receive = function(pValue) {
        if (Strategy != null)
            Strategy.receive(pValue);
        else
            Strategy = strategy_Factory(pValue);
    }

    this.exec = function() {
        Strategy.exec();
    }
    
    this.end = function() {
        if(Strategy.end!=null)  Strategy.end();
    }
    
    this.tonumber = function() {
        return Strategy.tonumber();
    }

    this.tostring = function() {
        return Strategy.tostring();
    }

    this.getType = function() {
        return Strategy.getType();
    }
    this.toBoolean = function() {
        if(Strategy != null && Strategy.toBoolean != null) return Strategy.toBoolean();
        return false; 
    }
}