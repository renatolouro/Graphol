function strategy_Block(pidBlock) {
    var p_mytype = "block";
    var p_vm;
    this.name = "";
    this.value = pidBlock;
    this.inbox = new Nodo();

    this.receive = function(pValue) {
        if(pValue.getMessage!=null && pValue.getMessage()=="run") this.exec();
        else {
           this.inbox = new Nodo();
           this.inbox.receive(pValue);
        }
    }

    this.tonumber = function() {

    }

    this.tostring = function() {

    }

    this.exec = function() {
        p_vm.call(this);
       
    }

    this.getType = function() {
        return p_mytype;
    }
    this.setVm = function(pVm) {
        p_vm=pVm;
    };
    this.getId = function() {
        return this.value;
    }
}