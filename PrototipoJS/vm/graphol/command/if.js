function If() {
    var p_mytype = "command";
    this.query = "";
    this.value = "";
    this.cases = new Array;
    this.elseBlock = null;
    this.state=0;

    this.receive = function(pValue) {
        if(pValue.getMessage!=null && pValue.getMessage()=="run") this.exec();
        else if(pValue.getMessage!=null && pValue.getMessage()=="else") this.state = 3; 
        else if(this.state==0) {
            this.cases[this.cases.length] = {
                "cond":pValue,
                "block":null
            }
            this.state = 1;
        } else if(this.state==1) {
            this.cases[this.cases.length-1].block=pValue;
            this.state = 0;                       
        } else if(this.state==3) {
            this.elseBlock = pValue; 
            this.state=0;
        }
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
        for(var i=0; i<this.cases.length;i++) {
            if(this.cases[i].cond.toBoolean !=null && this.cases[i].cond.toBoolean()) this.cases[i].block.exec();
            else if(this.cases[i].cond) this.cases[i].block.exec();
        }
        if(this.elseBlock!=null) this.elseBlock.exec();
        
        this.cases=new Array();
        this.elseBlock = null;
        this.state = 0;

    }

    this.getType = function() {
        return p_mytype;
    }
}