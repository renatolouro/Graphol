function grapholVm() {
    var p_blocks = new Array(); //Armazena o código compilado dividido em blocos
    var p_threads = new Array(); //Armazena as várias linhas de execução
    var p_currThread = -1;
    var p_end = true;
    var self = this;
    
    this.registerInstruction = function(psInstruction, pidBlock) {
        var idBlock = 0;
        var instructions = null;
        if(pidBlock!=null) idBlock = pidBlock;
        if(idBlock>=p_blocks.length) p_blocks[idBlock] = new Array();
        instructions = p_blocks[idBlock];
        instructions[instructions.length] = psInstruction;
    }
    this.getNewBlockId = function() {
        return p_blocks.length; 
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
    this.exec = function() {
        var thread;
        var graphol;
        p_end = false;
        newThread();

        while (!p_end) {
            thread=nextThread();
            graphol=thread.SCOPE;
            thread.IR.ADDR++;
            eval(p_blocks[thread.IR.BASE][thread.IR.ADDR]);
        }
    }
    
    this.clear = function() {
        p_blocks = new Array();
        p_threads = new Array();
    }
    
    this.call = function(pBlock) {
        var thread=getCurrThread();
        thread.IR.SCOPE = thread.SCOPE;
        thread.STACK.push(thread.IR);
        thread.SCOPE = new CGraphol();
        thread.SCOPE.set("inbox",pBlock.inbox);
        thread.IR = {
            BASE:pBlock.getId(),
            ADDR:-1,
            SCOPE:thread.SCOPE, 
            PARENT:thread.IR.BASE
            };
    }
    
    this.callback = function() {
        var thread=getCurrThread();
        thread.IR = thread.STACK.pop();  
        thread.SCOPE = thread.IR.SCOPE;
    }
    
    var newThread = function() {
        var thread = {
            IR: {
                BASE:0,
                ADDR:-1, 
                SCOPE: new CGraphol(),
                PARENT:null
            },
            SCOPE: new CGraphol(),
            STACK: new Array()
            } 
        p_threads[p_threads.length] = thread;   
    }
    
    var nextThread = function() {
        p_currThread++;
        if(p_currThread>=p_threads.length) p_currThread=0;
        return p_threads[p_currThread];
    }
    
    var getCurrThread = function() {
        return p_threads[p_currThread];
    }
    
    this.endExec = function() {
        p_end=true;
    }
    
}