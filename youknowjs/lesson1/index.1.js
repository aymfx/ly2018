var a = 12;

function add(){
    var a = 11;
    function s(){
        var a = 12;
        console.log(a,window.a)
    }
    s();
}
add();