function foo(str,a){
    "use strict";
    eval(str);
    console.log(a,b)
}

var b = 3;

foo('var b = 4',1)