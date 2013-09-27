function Echo(pStdout) {
    var p_mytype = "command";
    var p_stdout = pStdout;

    this.receive = function(pValue) {
        if (pValue != null && typeof(pValue) == 'object') {
            if (pValue['tostring'] != undefined)
                p_stdout.echo(pValue.tostring());
            else
                p_stdout.echo(pValue);
        }
        else
            p_stdout.echo(pValue);
    }

    this.exec = function() {
    }

    this.getType = function() {
        return p_mytype;
    }
}