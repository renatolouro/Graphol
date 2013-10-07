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
        if(Strategy != null && Strategy.end!=null)  Strategy.end();
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
    this.toboolean = function() {
        if(Strategy != null && Strategy.toboolean != null) return Strategy.toboolean();
        return false; 
    }
    
    this.getValue = function() {
        if(Strategy != null && Strategy.getValue != null) return Strategy.getValue();
        return null;
    }
    
    this.equals = function(pNodo) {

    }
}