function Stdout() {
    var p_Strategy = new Alert();

    this.receive = function(pValue) {
        switch(pValue.toLowerCase()) {
            case "console":
                p_Strategy = new Console();
                break;
            case "alert":
            default:
                p_Strategy = new Alert();
        }
    }

    this.echo = function(pValue) {
        p_Strategy.echo(pValue);
    }
}