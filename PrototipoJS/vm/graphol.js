function CGraphol() {
    var nodos = new Object;

    nodos["input"] = new Input();
    nodos["echo"] = new Echo();
    nodos["run"] = new Run();
    nodos["async"] = new Async();

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