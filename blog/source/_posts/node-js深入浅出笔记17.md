---
title: node.js深入浅出笔记17
date: 2017-09-29 11:39:39
tags: node 
---



# 页面渲染

##内容响应

> MIME用于判断文件类型

``` javascript 

//这个插件可以自动转换

var mine = require('mime')

mime.lookup("/xx/xx/file.txt")  =======> 'text/plain'
mime.lookup("file.txt")  =======> 'text/plain'
mime.lookup(".txt")  =======> 'text/plain'
mime.lookup(".html")  =======> 'text/html'
    ......

```

>响应附件的下载，通过Content-Disposition字段
 - Content-Disposition:attachment;filename='filename.ext'


``` javascript

res.sendfile = function (filepath) {
    fs.stat(filepath,function(err,stat){
            var stream = fs.createReadStream(filepath);

            //设置内容
            res.setHeader('Content-Type',mime.lookup(filepath));
            //设置长度
            res.setHeader("Content-Length",stat.size);
            //设置为附件
            res.setHeader('Content-Disposition','attachement;filename="'+path.basename(filepath)+'"');
            res.writeHead(200);
            stream.pipe(res);
        })
}

``` 

> 响应JSON

``` javascript

    res.json = function (json) {
        res.setHeader('Content-Type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify(json))
    }
```

> 响应跳转

``` javascript

    res.json = function (url) {
        res.setHeader('Location',url);
        res.writeHead(302);
        res.end('Redirect to ' + url)
    }
```

## 视图渲染

>模板是带有特殊标签的html片段，通过数据的渲染，将数据填充到这些特殊的标签中，最后生成普通的带有数据的html片段，我们将其设计为render,参数就是模板的路径和数据

``` javascript

    res.render = function (view,data) {
        res.setHeader('Content-Type','text/html');
        res.writeHead(200);
        //实际渲染
        var html = render(view,data);
        res.end(html);
    }

```

> 模板引擎渲染的方式

![流程图](https://aymfx.github.io/img/a20170925/a2.png)


>模板引擎渲染简单演示

```javascript

var render = function (str,data) {
    //模板技术就是替换特殊标签的技术
    var tpl = str.replace(/<%=([\s\S]+?)%>/g,function(match,code){
        return "'+obj."+code+"+'";
    });

    tpl = "var tpl= '"+tpl + "'\n return tpl;";
    var complied = new Function('obj',tpl);
    return complied(data);
}
//undefined
var tpl = 'Hell <%=username%>'
//undefined
console.log(render(tpl,{username:'ly'}))
//VM326:1 Hell ly

```

>模板安全,所有字符必须转义

``` javascript

var escape = function (html) {
    return String(html)
            .replace(/&(?!\w+;)/g,'&amp')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#039;')
}

```

## Bigpipe

 - 暂时不解释




















