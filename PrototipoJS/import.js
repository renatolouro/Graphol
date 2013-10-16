function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}


function loadScripts(idFile) {
    
    var files = new Array();
    var proxFile=idFile+1;
     
    files[files.length] = "vm/graphol/lang/nodo.js";
    files[files.length] = "vm/graphol/lang/base.js";
    files[files.length] = "vm/graphol/lang/types/operator.js";
    files[files.length] = "vm/graphol/lang/types/number.js";
    files[files.length] = "vm/graphol/lang/types/string.js";
    files[files.length] = "vm/graphol/lang/types/boolean.js";
    files[files.length] = "vm/graphol/lang/types/block.js";
    files[files.length] = "vm/graphol/lang/booleanOperators/booleanOperator.js";
    files[files.length] = "vm/graphol/lang/booleanOperators/logicOperator.js";
    files[files.length] = "vm/graphol/lang/messages/run.js";
    files[files.length] = "vm/graphol/lang/messages/async.js";
    files[files.length] = "vm/graphol/lang/messages/else.js";
    files[files.length] = "vm/graphol/lang/commands/if.js";
    files[files.length] = "vm/graphol/command/echo.js";
    files[files.length] = "vm/graphol/command/input.js";
    files[files.length] = "vm/graphol/command/stdout/core.js";
    files[files.length] = "vm/graphol/command/stdout/alert.js";
    files[files.length] = "vm/graphol/command/stdout/console.js";
    files[files.length] = "vm/graphol.js";
    files[files.length] = "vm/grapholvm.js";
    files[files.length] = "compiler/compiler.js";
    
    var prox = function(){
        loadScripts(proxFile)
        }
    
    if(idFile<files.length) loadScript(files[idFile], prox);
    else {
        vm = new grapholVm();
        gc = new grapholCompiler();  
    }
    
    
}

loadScripts(0);
















