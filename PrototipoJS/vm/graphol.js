function CGraphol(pThreads) {
    var nodos = new Object;

    nodos["input"] = new Input();
    nodos["echo"] = new Echo();
    nodos["run"] = new Run();

    this.get = function(pKey)
    {
        if (nodos[pKey] == null)
            nodos[pKey] = new Nodo();

        return nodos[pKey];
    }
}