function CGraphol(pThreads) {
    var nodos = new Object;
    var threads = pThreads;

    nodos["input"] = new Input();
    nodos["echo"] = new Echo();

    this.get = function(pKey)
    {
        if (nodos[pKey] == null)
            nodos[pKey] = new Nodo();

        return nodos[pKey];
    }
}