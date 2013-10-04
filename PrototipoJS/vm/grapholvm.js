function grapholVm() {
    var p_blocks = new Array(); //Armazena o código compilado dividido em blocos
    var p_threads = new Array(); //Armazena as várias linhas de execução
    var p_currThread = -1;
    var p_end = true;
    var self = this;
    var stdout = new Stdout();
    
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
            graphol=thread.IR.SCOPE;
            thread.IR.ADDR++;
            eval(p_blocks[thread.IR.ADDR]);
        }
    }
    
    this.clear = function() {
        p_blocks = new Array();
        p_threads = new Array();
    }
    
    this.call = function(pBlock) {
        var thread;
        if(pBlock.isAsync()) thread=newThread();
        else thread=getCurrThread();
        thread.STACK.push(thread.IR);
        thread.IR = {
            BASE:pBlock.getId()-1,
            ADDR:pBlock.getId()-2,
            SCOPE: new CGraphol(stdout, pBlock.p_parentScope),
            PARENT:thread.IR.BASE
        };
     
        thread.IR.SCOPE.set("inbox",pBlock.inbox);
    }
    
    
    this.callback = function() {
        var thread=getCurrThread();
        if(thread.STACK.length>0) thread.IR = thread.STACK.pop();
        else removeThread();
    }
    
    this.JMP = function(ADDR) {
        var thread=getCurrThread(); 
        thread.IR.ADDR = ADDR-2; 
    //-- pois o while que itera sobre as instruções já realiza um ++
    //-- pois Array começa em 0 e a contagem de linhas em 1
    }
    
    var newThread = function() {
        var thread = {
            IR: {
                BASE:0,
                ADDR:-1, 
                SCOPE: new CGraphol(stdout),
                PARENT:null
            },
            STACK: new Array()
        } 
        p_threads[p_threads.length] = thread;  
        return thread;
    }
    
    var removeThread = function(){
        p_threads.splice(p_currThread,1);
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
    
    this.load = function(psCode) {
        this.clear();
        p_blocks=psCode.split("\n")
    }
    
}