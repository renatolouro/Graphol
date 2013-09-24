function grapholVm() {
    var p_blocks = new Array();
    var p_end = true;
    var p_IR  = {BASE:0,ADDR:-1, SCOPE:null, PARENT:null};
    var p_stack = new Array();
    var self = this;
    var graphol = null;
    
    this.registerInstruction = function(psInstruction, pidBlock) {
        var idBlock = 0;
        var instructions = null;
        if(pidBlock!=null) idBlock = pidBlock;
        if(idBlock>=p_blocks.length) p_blocks[idBlock] = new Array();
        instructions = p_blocks[idBlock];
        instructions[instructions.length] = psInstruction;
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
        graphol = new CGraphol();
        p_end = false;
        p_IR = {BASE:0,ADDR:-1,SCOPE:graphol, PARENT:null};

        while (!p_end) {
            p_IR.ADDR++;
            eval(p_blocks[p_IR.BASE][p_IR.ADDR]);
        }
    }
    
    this.clear = function() {
        p_blocks = new Array();
    }
    
    this.call = function(pBlock) {
        p_stack.push(p_IR);
        graphol = new CGraphol();
        p_IR = {BASE:pBlock.getId(),ADDR:-1,SCOPE:graphol, PARENT:p_IR.BASE};
    }
    
    this.callback = function() {
        p_IR = p_stack.pop();  
        graphol = p_IR.SCOPE;
    }
    
    this.endExec = function() {
        p_end=true;
    }
    
}