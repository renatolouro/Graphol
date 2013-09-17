function strategy_Operator(psSignal)
{
    var p_mytype = "operator";
    this.name = psSignal;
    this.value = null;
    this.receive = function(pValue) {
        var value = pValue;
        if (value != null && typeof(value) == 'object') {
            if (value['tonumber'] != null)
                value = value.tonumber();
            else if (value['tostring'] != null)
                value = parseFloat(value = value.tostring());
            else
                value = Number(value);
        }
        else if (value != null)
            value = parseFloat(pValue);
        if (!isNaN(value)) {
            if (this.value == null)
                this.value = value;
            else
                eval("this.value" + this.name + "=value;");
        }
        return;
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

function strategy_Null() {
    this.exec = function() {
    }
    this.tonumber = function() {
    }
    this.tostring = function() {
    }
    this.getType = function() {
    }
}

function strategy_Number(pValue) {
    var p_mytype = "number";
    this.name = "";
    this.value = pValue;
    this.strategy = new strategy_Operator("+");
    if (pValue)
        this.strategy.receive(this.value);

    this.receive = function(pValue) {
        var value = pValue;
        if (pValue == "+" || pValue == "-" || pValue == "/" || pValue == "*") {
            this.value = this.strategy.tonumber();
            this.strategy = new strategy_Operator(pValue);
            this.strategy.receive(this.value);
            return;
        }
        if (value != null && typeof(value) == 'object') {
            if (value.getType() == "operator") {
                this.strategy = value;
                this.strategy.receive(this.value);
                this.value = this.strategy.tonumber();
                return;
            }
            else if (value['tonumber'] != null)
                value = value.tonumber();
            else if (value['tostring'] != null)
                value = parseFloat(value = value.tostring());
            else
                value = Number(value);
        }
        else if (value != null)
            value = parseFloat(pValue);

        if (!isNaN(value)) {
            this.strategy.receive(value);
            this.value = this.strategy.tonumber();
        }
        return;
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

function strategy_String(pValue)
{
    var p_mytype = "text";
    this.name = "";
    this.value = pValue;
    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['tostring'] != null)
                this.value += pValue.tostring();
            else
                this.value += pValue
        }
        else
            this.value += pValue;
    }
    this.tonumber = function() {
        if (isNaN(parseFloat(this.value)))
            return 0;
        return parseFloat(this.value);
    }
    this.tostring = function() {
        return this.value;
    }
    this.exec = function() {

    }
    this.getType = function() {
        return p_mytype;
    }
}

function strategy_Factory(pValue) {
    var Strategy = null;

    if (pValue != null && typeof(pValue) == 'object') {
        if (pValue['getType'] != null) {
            if (pValue.getType() == "number")
                Strategy = new strategy_Number(pValue.tonumber());
            else if (pValue.getType() == "operator") {
                Strategy = new strategy_Number(null);
                Strategy.receive(pValue);
            }
            else
                Strategy = new strategy_String(pValue.tostring());
        }
        else if (pValue['tostring'] != null)
            Strategy = new strategy_String(pValue.tostring());
        else
            Strategy = new strategy_String(pValue.tostring());
    }
    else if (typeof(pValue) == 'string')
        Strategy = new strategy_String(pValue);
    else if (!isNaN(pValue))
        Strategy = new strategy_Number(pValue);
    else
        Strategy = new strategy_Null();

    return Strategy;
}

function Input()
{
    var p_mytype = "command";
    this.query = "";
    this.value = "";
    this.receive = function(pValue) {
        this.query += pValue;
    }
    this.tonumber = function() {
        if (isNaN(parseFloat(this.value)))
            return 0;
        return parseFloat(this.value);
    }
    this.tostring = function() {
        return this.value;
    }
    this.exec = function() {
        this.value = prompt(this.query, "");
        this.query = "";
    }
    this.getType = function() {
        return p_mytype;
    }
}

function Echo()
{
    var p_mytype = "command";
    var arrRec = new Array();
    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['tostring'] != undefined)
                arrRec[arrRec.length] = pValue.tostring();
            else
                arrRec[arrRec.length] = pValue
        }
        else
            arrRec[arrRec.length] = pValue;
    }
    this.exec = function(pValue) {
        for (var i = 0; i < arrRec.length; i++)
            alert(arrRec[i]);
        arrRec = new Array()
    }
    this.getType = function() {
        return p_mytype;
    }
}

function nodoParser(psValue, psType)
{
    this.type = psType
    this.value = psValue;
}

function Nodo()
{
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

function CGraphol(pThreads)
{
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

   