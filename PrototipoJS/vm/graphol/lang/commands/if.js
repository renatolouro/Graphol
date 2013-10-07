function If() {
    var p_mytype = "command";
    this.query = "";
    this.value = "";
    this.cond = false;
    this.block = null;
    this.executeElse = true;
    this.state=0;

    this.receive = function(pValue) {
        if(pValue.getMessage!=null && pValue.getMessage()=="else") this.state = 3; 
        else if(this.state==0) {
            this.cond=pValue;
            this.state = 1;
        } else if(this.state==1) {
            this.state = 0;                       
            if(this.cond.toboolean){                    
                if(this.cond.toboolean()) {
                    pValue.exec();
                    this.executeElse = false;
                }
            } else if(this.cond) {
                pValue.exec();
                this.executeElse = false;
            }
      
        } else if(this.state==3) {
            this.state=0;
            if(pValue!=null && this.executeElse) pValue.exec();
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


    }
    
    this.end = function() {        
        this.cond = false;
        this.block = null;
        this.executeElse = true;
        this.state=0;
    }

    this.getType = function() {
        return p_mytype;
    }
}