function nodoParser(psValue, psType) {
    this.type = psType
    this.value = psValue;
}

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

    this.tonumber = function() {
        return Strategy.tonumber();
    }

    this.tostring = function() {
        return Strategy.tostring();
    }

    this.getType = function() {
        return Strategy.getType();
    }
}