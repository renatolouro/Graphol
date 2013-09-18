function grapholVm() {
    var p_instructions = new Array();
    this.registerInstruction = function(psInstruction) {
        p_instructions[p_instructions.length] = psInstruction;
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

        for (var i = 0; i < p_instructions.length; i++)
            eval(p_instructions[i]);

    }
}