function foo(obj){
    console.log(obj.a,'1')
    console.log(b,'6')
    with(obj){
        a = 2;
        var b = 2;
    }
    console.log(obj.a,'2')
    console.log(b,'3')
}

console.log(typeof b)

var obj = {
    a:1
}

foo(obj)

console.log(obj.a,'4')
console.log(obj.b,'5')