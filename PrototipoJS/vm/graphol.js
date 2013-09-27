function CGraphol() {
    var nodos = new Object;

    nodos["input"] = new Input();
    nodos["run"] = new Run();
    nodos["stdout"] = new Stdout();
    nodos["echo"] = new Echo(nodos["stdout"]);
    
    this.get = function(pKey)
    {
        if (nodos[pKey] == null)
            nodos[pKey] = new Nodo();

        return nodos[pKey];
    }
    this.set = function(pKey, pValue) {
        nodos[pKey] = pValue;
    }
}