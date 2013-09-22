function strategy_Block(pidBlock) {
    var p_mytype = "block";
    var p_vm;
    this.name = "";
    this.value = pidBlock;

    this.receive = function(pValue) {
        if(pValue.getMessage()=="run") this.exec();
    }

    this.tonumber = function() {

    }

    this.tostring = function() {

    }

    this.exec = function() {
        p_vm.call(this.value);
       
    }

    this.getType = function() {
        return p_mytype;
    }
    this.setVm = function(pVm) {
        p_vm=pVm;
    };
}