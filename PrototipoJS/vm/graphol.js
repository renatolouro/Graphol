function CGraphol(stdout) {
    var nodos = new Object;

    nodos["input"] = new Input();
    nodos["run"] = new Run();
    nodos["stdout"] = stdout;
    nodos["echo"] = new Echo(nodos["stdout"]);
    nodos["async"] = new Async();
    nodos["if"] = new If();

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