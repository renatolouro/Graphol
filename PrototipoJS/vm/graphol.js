function CGraphol(stdout, parent) {
    var nodos = new Object;

    nodos["input"] = new Input();
    nodos["run"] = new Run();
    nodos["stdout"] = stdout;
    nodos["echo"] = new Echo(nodos["stdout"]);
    nodos["async"] = new Async();
    nodos["if"] = new If();
    nodos["else"] = new Else();
    
    this.find = function(pKey)
    {
        if (nodos[pKey] == null)
            if(parent!=null) return parent.find(pKey);
        return nodos[pKey];
    }

    this.get = function(pKey)
    {
        var value = null;
        value = this.find(pKey);
        if(value!=null) return value;
        nodos[pKey] = new Nodo();
        return nodos[pKey];
    }
    this.set = function(pKey, pValue) {
        nodos[pKey] = pValue;
    }
}