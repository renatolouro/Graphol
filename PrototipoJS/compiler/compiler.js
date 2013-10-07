function grapholCompiler() {
    var p_iPos = 0;
    var p_cntNodoLin = 0;
    var p_code = new Array();
    var p_childrensCode = new Array()

    var ehFinalizadorDeNome = function(psCaracter) {
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
            || psCaracter == '{'
            || psCaracter == '}'
            )
    }

    var ehNodoReservado = function(psCode) {
        var snodo;
        if (psCode.length>=p_iPos+2) {
            snodo = psCode.substring(p_iPos,p_iPos+2);
            if(snodo == '!='
                || snodo == '<='
                || snodo == '>=') {
                p_iPos++;
                return (new nodoParser(snodo,"LogicalOperator"));
            } else if(snodo == 'x|') {
                p_iPos++;
                return (new nodoParser(snodo,"BooleanOperator"));
            }
        }           
            
        snodo=psCode.charAt(p_iPos);
        if (snodo == '+'
            || snodo == '-'
            || snodo == '*'
            || snodo == '/'
            || snodo == '^'
                ) return (new nodoParser(snodo,"Operator"));
        if (snodo == '&') return (new nodoParser("&&","BooleanOperator"));
        if (snodo == '|') return (new nodoParser("||","BooleanOperator"));
        if (snodo == '!') return (new nodoParser("!","BooleanOperator"));
        if (snodo == '>'
            || snodo == '<') return (new nodoParser(snodo,"LogicalOperator"));
        if (snodo == '='
                ) return (new nodoParser("==","LogicalOperator")); 
            
        return false;
    }   
    

            

    var out = function(psOut) {
        p_code[p_code.length]=psOut;
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
    var consomeRuido = function(psCode) {
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
    var consomeEspacos = function(psCode) {
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
    var processaString = function(psCode) {
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
        var sNodo;
        sNodo = ehNodoReservado(psCode)
        if (sNodo) {
            if (pbIsRoot)
                out("graphol.operator" + p_cntNodoLin + "=new Nodo(); graphol.operator" + p_cntNodoLin + ".receive(new strategy_" + sNodo.type + "(\"" + sNodo.value + "\"));");
            else
                out("graphol.operator" + p_cntNodoLin + "=new strategy_" + sNodo.type + "(\"" + sNodo.value + "\");");
            return new nodoParser("graphol.operator" + p_cntNodoLin, "operator");
        }
        if (psCode.charAt(p_iPos) == '"') {
            p_cntNodoLin++;
            out("graphol.text" + p_cntNodoLin + "=\"" + processaString(psCode) + "\";")
            return new nodoParser("graphol.text" + p_cntNodoLin, "string");
        }
        sNodo = "";
        while (p_iPos < psCode.length &&
            !ehFinalizadorDeNome(psCode.charAt(p_iPos)))
            {
            sNodo = sNodo + psCode.charAt(p_iPos);
            p_iPos++;
        }
        if (ehFinalizadorDeNome(psCode.charAt(p_iPos)))
            p_iPos--;

        if (pbIsRoot || (!isNaN(sNodo))|| sNodo == "true" || sNodo == "false" )
            return sNodo;
        out("graphol.arg" + piNivel + "=graphol.get(\"" + sNodo + "\");");
        return "graphol.arg" + piNivel
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
    var processaExpressao = function(psCode, piNivel) {
        var sNodoReciver = "";
        var sNodo;
        var bSubExpressao = false;

        piNivel++;

        while (
            p_iPos < psCode.length
            && (
                psCode.charAt(p_iPos) != "\n"
                && psCode.charAt(p_iPos) != "\r"
                && psCode.charAt(p_iPos) != ")"
                && psCode.charAt(p_iPos) != "}"
                )
            )
            {
            bSubExpressao = false;
           
            if (psCode.charAt(p_iPos) == '{') {
                p_iPos++;
                var idBlock = p_childrensCode.length + 1;
                var gc=new grapholCompiler();
                p_childrensCode = gc.processaBloco(psCode, p_iPos, p_childrensCode);
                p_iPos = gc.getPos();
                out("graphol.block" + (idBlock) + "=new strategy_Block(" + (idBlock) + ");");
                out("graphol.block" + (idBlock) + ".setVm(self);");
                out("graphol.block" + (idBlock) + ".setParentScope(graphol);");
                sNodo = "graphol.block" + (idBlock);
            }
            else if (psCode.charAt(p_iPos) == '(') {
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
                    if (sNodo.type == 'string') {
                        out("graphol.nodo" + piNivel + "=new Nodo()");
                        out("graphol.nodo" + piNivel + ".receive(" + sNodo.value + ")");
                    }
                    else
                        out("graphol.nodo" + piNivel + "=" + sNodo.value + ";")
                }
                else if (!isNaN(sNodo)){
                    out("graphol.nodo" + piNivel + "=new Nodo()");
                    out("graphol.nodo" + piNivel + ".receive(" + sNodo + ")");
                }
                else if (bSubExpressao)
                    out("graphol.nodo" + piNivel + "=" + sNodo + ";");
                else
                    out("graphol.nodo" + piNivel + "=graphol.get(\"" + sNodo + "\");");

                if (typeof(sNodo) == 'object')
                    sNodoReciver = sNodo.value;
                else if (!isNaN(sNodo))
                    sNodoReciver = "graphol.nodo" + piNivel;
                else
                    sNodoReciver = sNodo;
            }
            else {
                if (typeof(sNodo) == 'object')
                    out("graphol.nodo" + piNivel + ".receive(" + sNodo.value + ");");
                else
                    out("graphol.nodo" + piNivel + ".receive(" + sNodo + ");");
            }
            
            p_iPos++;
            consomeEspacos(psCode);
        }

        if (piNivel > 1 &&
            (p_iPos >= psCode.length
                || psCode.charAt(p_iPos) == "\n"
                || psCode.charAt(p_iPos) == "\r"
                ))
            throw "Err1";
        else {
            if(sNodoReciver!="") out("graphol.nodo" + piNivel + ".end();");
            return "graphol.nodo" + piNivel;
        }

    }
    
    this.processaBloco = function(psCode, piPos, pChildrensCode) {
        var posHolder;
        p_childrensCode = pChildrensCode;
        posHolder = p_childrensCode.length;
        p_childrensCode[posHolder] = "self.JMP("+(p_childrensCode.length+1)+")"; //holder
        p_iPos = piPos;
        var endBlock = false;
        while (!endBlock)
        {
            consomeRuido(psCode);
            processaExpressao(psCode, 0);
            if(psCode.charAt(p_iPos) == "}") endBlock=true;
            else p_iPos++;
            if(p_iPos >= psCode.length) throw "Err2";
        }
        out("self.callback();");
        p_childrensCode[posHolder] = "self.JMP("+(p_childrensCode.length+1)+")"; //holder
        return p_childrensCode.concat(p_code);
        
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
    this.parser = function(psCode) {
        p_iPos = 0;
        p_cntNodoLin = 0;
        p_code = new Array();
        p_childrensCode = new Array();
    
        p_childrensCode[0] = "self.goto(1)"; //holder
        while (p_iPos < psCode.length)
        {
            consomeRuido(psCode);
            processaExpressao(psCode, 0);
            p_iPos++;
        }
        p_iPos = 0;
        out("self.endExec();");
        p_childrensCode[0] = "self.JMP("+(p_childrensCode.length+1)+")"; //holder
        p_childrensCode=p_childrensCode.concat(p_code);
        return p_childrensCode.join("\n");
        
    }

    this.getOut = function() {
        return p_childrensCode.join("\n");
    }
    
    this.getPos = function() {
        return p_iPos;
    }
}

function nodoParser(psValue, psType) {
    this.type = psType
    this.value = psValue;
}