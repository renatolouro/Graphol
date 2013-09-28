function Input() {
    var p_mytype = "command";
    this.query = "";
    this.value = "";

    this.receive = function(pValue) {
        this.value = prompt(pValue, "");
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

    }

    this.getType = function() {
        return p_mytype;
    }
}