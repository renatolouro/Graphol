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
        if (Strategy != null) {
            Strategy.receive(pValue);
        }
        else {
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
        }
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

function grapholCompiler()
{
    var p_iPos = 0;
    var p_state = 0;
    var p_out = "";
    var p_threads = new Array();
    var p_cntNodoLin = 0;
    var p_cntParentLin = 0;


    var ehFinalizadorDeNome = function(psCaracter)
    {
        return(psCaracter == "\n"
                || psCaracter == "\r"
                || psCaracter == " "
                || psCaracter == '+'
                || psCaracter == '-'
                || psCaracter == '*'
                || psCaracter == '/'
                || psCaracter == '^'
                || psCaracter == ')'
                || psCaracter == '('
                )
    }

    var ehNodo1Caracter = function(psCaracter)
    {
        return (psCaracter == '+'
                || psCaracter == '-'
                || psCaracter == '*'
                || psCaracter == '/'
                || psCaracter == '^'
                )

    }

    var out = function(psOut) {
        p_threads[p_threads.length] = psOut;
    }

    /*******************************************************************************
     *$FC consomeRuido Consome Ruído
     *
     *$ED Descrição da Função
     *    Percorre todos os espaços e quebras de linhas existentes entre dois 
     *    simbolos quaisquer e posiciona p_iPos no 1o caracter do próximo simbolo. 
     *    Utilizado para, ao chegar ao fim de uma expressão, encontrar o início da
     *    Próxima.
     *  
     *$EP Parâmetros da Função
     *$P  psCode Código Fonte - String 
     *      Ao Entrar: Contem o código que está sendo compilado
     *
     *$P  p_iPos Posição - Inteiro
     *      Ao Entrar: Contem a posição, no código fonte, do 1o 'caracter nulo' de 
     *         uma sequência
     *      Ao Sair:   Contem a posição, no código fonte, do último 'caracter nulo'
     *         de sequência 
     *
     *******************************************************************************/
    var consomeRuido = function(psCode)
    {
        while (
                p_iPos < psCode.length
                && (
                psCode.charAt(p_iPos) == "\n"
                || psCode.charAt(p_iPos) == "\r"
                || psCode.charAt(p_iPos) == " "
                )
                )
            p_iPos++;
    }

    /*******************************************************************************
     *$FC consomeEspacos Consome Espaços
     *
     *$ED Descrição da Função
     *    Percorre todos os espaços existentes entre dois simbolos quaisquer e 
     *    posiciona p_iPos no 1o caracter do próximo simbolo
     *    Utilizado para, ao chegar ao fim de um nodo, encontrar o início do próximo.
     * 
     *$EP Parâmetros da Função
     *$P  psCode Código Fonte - String 
     *      Ao Entrar: Contem o código que está sendo compilado
     *
     *$P  p_iPos Posição - Inteiro
     *      Ao Entrar: Contem a posição, no código fonte, do 1o espaço de uma 
     *         sequência
     *      Ao Sair:   Contem a posição, no código fonte, do último espaço de uma
     *         sequência 
     *
     *******************************************************************************/
    var consomeEspacos = function(psCode)
    {
        while (p_iPos < psCode.length && psCode.charAt(p_iPos) == " ")
            p_iPos++;
    }

    /*******************************************************************************
     *$FC processaString PROCESSA String
     *
     *$ED Descrição da Função
     *    Recebe o código fonte -psCode- e o contador -p_iPos- apontando para o 1o 
     *    caractere de uma string. Ou seja, o 1o caracter após a abertura de aspas. 
     *    A função encontratá o final da string e passará a apontar para o fechamento 
     *    das aspas ("). A função reconhece as aspas escapada-\"-como parte da string
     *  
     *$EP Parâmetros da Função
     *$P  psCode Código Fonte - String 
     *      Ao Entrar: Contem o código que está sendo compilado
     *
     *$P  p_iPos Posição - Inteiro
     *      Ao Entrar: Contem a posição, no código fonte, do 1o caracter do Nodo
     *      Ao Sair:   Contem a posição, no código fonte, do último caracter do Nodo
     *
     *******************************************************************************/
    var processaString = function(psCode)
    {
        var sNodo = "";
        p_iPos++;
        while (
                p_iPos < psCode.length
                && (
                psCode.charAt(p_iPos) != "\""
                )
                )
        {
            if (psCode.charAt(p_iPos) == "\\") {
                p_iPos++;
                sNodo = sNodo + "\\" + psCode.charAt(p_iPos);
            } else
                sNodo = sNodo + psCode.charAt(p_iPos);
            p_iPos++;
        }
        return sNodo;
    }

    /*******************************************************************************
     *$FC processaNodo PROCESSA PRÓXIMO NODO
     *
     *$ED Descrição da Função
     *    Recebe o código fonte -psCode- e o contador -p_iPos- apontando para o 1o 
     *    caractere do nodo. A função:
     *       -Identifica até onde vai o nodo;
     *       -Gera o código compilado correspondente;
     *       -Retorna para a função chamadora a identificação compilada do nó; e
     *       -Posiciona -p_iPos- no último caractere do nodo no código fonte
     *    
     *$EP Parâmetros da Função
     *$P  psCode Código Fonte - String 
     *      Ao Entrar: Contem o código que está sendo compilado
     *
     *$P  p_iPos Posição - Inteiro
     *      Ao Entrar: Contem a posição, no código fonte, do 1o caracter do Nodo
     *      Ao Sair:   Contem a posição, no código fonte, do último caracter do Nodo
     *
     *$P  pbIsRoot É a Raiz - Boolean
     *      Ao Entrar: 
     *         True: O NODO processado é o primeiro de uma 
     expressão. Ou seja, se ele é um nodo recebedor de mensagem.
     *         False:O NODO processado é uma mensagem que será passado para outro.
     *            
     *$P  piNivel Nível - Inteiro
     *      Ao Entrar: Profundidade da recursão. Utilizado para nomear as 
     *         variáveis compiladas, evitando a colisão de nomes
     *******************************************************************************/
    var processaNodo = function(psCode, pbIsRoot, piNivel) {
        var sNodo = "";
        if (ehNodo1Caracter(psCode.charAt(p_iPos))) {
            if (pbIsRoot)
                out("operator" + p_cntNodoLin + "=new Nodo(); operator" + p_cntNodoLin + ".receive(new strategy_Operator(\"" + psCode.charAt(p_iPos) + "\"));\n");
            else
                out("operator" + p_cntNodoLin + "=new strategy_Operator(\"" + psCode.charAt(p_iPos) + "\");\n");
            return new nodoParser("operator" + p_cntNodoLin, "operator");
        }
        if (psCode.charAt(p_iPos) == '"') {
            p_cntNodoLin++;
            out("text" + p_cntNodoLin + "=\"" + processaString(psCode) + "\";\n")
            return new nodoParser("text" + p_cntNodoLin, "string");
        }
        while (p_iPos < psCode.length &&
                !ehFinalizadorDeNome(psCode.charAt(p_iPos)))
        {
            sNodo = sNodo + psCode.charAt(p_iPos);
            p_iPos++;
        }
        if (ehFinalizadorDeNome(psCode.charAt(p_iPos)))
            p_iPos--;

        if (pbIsRoot || (!isNaN(sNodo)))
            return sNodo;
        out("arg" + piNivel + "=graphol.get(\"" + sNodo + "\");\n");
        return "arg" + piNivel
    }

    /*******************************************************************************
     *$FC processaExpressao PROCESSA EXPRESSÃO
     *
     *$ED Descrição da Função
     *    Compila uma expressão Graphol. Uma expressão em graphol é definida como uma
     *       sequência de nodos onde o primeiro recebe, como mensagem, os demais. 
     *       Esta sequência pode estar numa linha de código ou dentro de parenteses.
     *       Resumidamente, esta função irá:
     *          -Chamar consecutivamente o processaNodo para cada nodo da expressão;
     *          -Chamar a si mesma, recursivamente, caso encontre parenteses; e
     *          -Gerar o código fonte na linguagem alvo.
     *    
     *$EP Parâmetros da Função
     *
     *$P  psCode Código Fonte - String 
     *      Ao Entrar: Contem o código que está sendo compilado
     *
     *$P  p_iPos Posição - Inteiro
     *      Ao Entrar: Contem a posição, no código fonte, do 1o caracter do 1o Nodo
     *         da expressão. 
     *      Ao Sair:   Contem a posição seguinte à expressão. Se a expressão terminar 
     *         numa quebra de linha, p_iPos apontará para a quebra. Se terminar no )
     *         apontará para o )
     *            
     *$P  piNivel Nível - Inteiro
     *      Ao Entrar: Profundidade da recursão. Utilizado para nomear as 
     *         variáveis compiladas, evitando a colisão de nomes
     *******************************************************************************/
    var processaExpressao = function(psCode, piNivel)
    {
        var sNodoReciver = "";
        var sNodo;
        var bUnic = true;
        var bSubExpressao = false;

        piNivel++;

        while (
                p_iPos < psCode.length
                && (
                psCode.charAt(p_iPos) != "\n"
                && psCode.charAt(p_iPos) != "\r"
                && psCode.charAt(p_iPos) != ")"
                )
                )
        {
            bSubExpressao = false;
            if (psCode.charAt(p_iPos) == '(') {
                p_iPos++;
                bSubExpressao = true;
                sNodo = processaExpressao(psCode, piNivel);
            }
            else {
                if (sNodoReciver == "")
                    sNodo = processaNodo(psCode, true, piNivel);
                else
                    sNodo = processaNodo(psCode, false, piNivel);
            }
            if (sNodoReciver == "") {
                if (typeof(sNodo) == 'object') {
                    if (sNodo.type == 'string')
                        out("nodo" + piNivel + "=new Nodo()\nnodo" + piNivel + ".receive(" + sNodo.value + ")\n");
                    else
                        out("nodo" + piNivel + "=" + sNodo.value + ";\n")
                }
                else if (!isNaN(sNodo))
                    out("nodo" + piNivel + "=new Nodo()\nnodo" + piNivel + ".receive(" + sNodo + ")\n");
                else if (bSubExpressao)
                    out("nodo" + piNivel + "=" + sNodo + ";\n");
                else
                    out("nodo" + piNivel + "=graphol.get(\"" + sNodo + "\");\n");

                if (typeof(sNodo) == 'object')
                    sNodoReciver = sNodo.value;
                else if (!isNaN(sNodo))
                    sNodoReciver = "nodo" + piNivel;
                else
                    sNodoReciver = sNodo;
            }
            else {
                if (typeof(sNodo) == 'object')
                    out("nodo" + piNivel + ".receive(" + sNodo.value + ");\n");
                else
                    out("nodo" + piNivel + ".receive(" + sNodo + ");\n");
                bUnic = false;
            }
            p_iPos++;
            consomeEspacos(psCode);
        }
        if (bUnic)
            alert("#" + sNodoReciver + "#");
        bUnic = true;

        if (piNivel > 1 &&
                (p_iPos >= psCode.length
                        || psCode.charAt(p_iPos) == "\n"
                        || psCode.charAt(p_iPos) == "\r"
                        ))
            throw "Err1";
        else {
            out("nodo" + piNivel + ".exec();\n");
            return "nodo" + piNivel;
        }

    }

    /*******************************************************************************
     *$FC parser Parser
     *
     *$ED Descrição da Função
     *    Compila o código fonte em Graphol, gerando código na linguagem alvo, no 
     *       caso, Javascript.
     *       Como um código fonte em grafol é, resumidamente, uma seguência de 
     *          expressões, resumidamente, esta função irá:
     *          -Chamar consecutivamente o processaExpressao;
     *          -Consumir o possível 'Ruido' entre cada expressão, ou seja, quebra de
     *             linhas, espaços e comentários;
     *    
     *$EP Parâmetros da Função
     *
     *$P  psCode Código Fonte - String 
     *      Ao Entrar: Contem o código que está sendo compilado
     *
     *$P  p_iPos Posição - Inteiro
     *      Ao Entrar: 0
     *      Ao Sair:   Tamanho do código fonte + 1
     *******************************************************************************/
    this.parser = function(psCode)
    {
        p_threads = new Array();
        while (p_iPos < psCode.length)
        {
            consomeRuido(psCode);
            processaExpressao(psCode, 0);
            p_iPos++;
        }
        p_iPos = 0;
    }

    /*******************************************************************************
     *$FC exec Executar
     *
     *$ED Descrição da Função
     *    Executa o código fonte, no momento, dando um eval sobre o código compilado
     *    
     *$EP Parâmetros da Função
     *
     *$P  p_out Código Compilado - String 
     *      Ao Entrar: Contém o código compilado
     *
     *******************************************************************************/
    this.exec = function()
    {
        //alert(p_out);
        graphol = new CGraphol();

        for (var i = 0; i < p_threads.length; i++)
            eval(p_threads[i]);

    }
}
/************* FIM *****************************/

/************ INICIALIZAÇÃo *******************/
gc = new grapholCompiler();

   