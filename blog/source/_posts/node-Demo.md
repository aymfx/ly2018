---
title: node_Demo
date: 2017-10-17 09:42:13
tags: node
---

# file-explorer

``` javascript
var fs = require("fs"),
    stdin = process.stdin,
    stdout = process.stdout,
    stats = [];

fs.readdir(process.cwd(), function(err, files) {
    console.log(' ');
    if (!files.length) {
        return console.log("没有文件");
    }

    console.log("请选择文件或者目录");

    function file(i) {
        var filename = files[i];
        fs.stat(__dirname + '/' + filename, function(err, stat) { //fs.stat()检测一个文件是否存在
            if (stat.isDirectory()) {
                console.log('       ' + i + '          \033[90m' + filename + '/\033[39m');
                stats[i] = stat;
            } else {
                console.log('       ' + i + '          \033[90m' + filename + '\033[39m');
            }
            i++;
            if (i == files.length) {
                read();
            } else {
                file(i)
            }
        })
    }

    file(0);

    // 当用户输入时，读取用户输入的值

    function read() {
        console.log('');
        stdout.write('                \033[33mEnter your choice: \033[39m');
        stdin.resume(); //标准输入流默认是暂停 (pause) 的，所以必须要调用 process.stdin.resume() 来恢复 (resume) 接收,这里用来等待用户输入
        stdin.setEncoding('utf-8');
        stdin.on('data', option);
    }

    function option(data) {
        var filename = files[Number(data)];
        if (!filename) {
            stdout.write("                     \033[31mEnter your choice: \033[39m");
        } else {
            stdin.pause();

            if(stats[Number(data)].isDirectory){
                fs.readdir(__dirname + '/' + filename,'utf-8',function(err,files){
                    console.log('');
                    console.log('               ('+files.length+'files)');
                    files.forEach(function(file){
                        console.log('                 -     '+file);
                    })
                })

            }else{
                fs.readFile(__dirname + '/' + filename,'utf-8',function(err,data){
                    console.log('');
                    console.log("\033[90m"+data.replace(/(.*)/g,'            56+3$1')+"\033[39m");
            })
            }
        }
    }


})


```



# tcp-chat

``` javascript

/**
 * 模块依赖
 */

var net = require('net');

var count = 0,
    users = {};

/**
 * 创建服务器
 */

var server = net.createServer(function(conn) {
    //handle connection
    console.log("\033[96m    new Server Connection....  \033[39m");
    count++;
    // console.log(conn);

    conn.setEncoding("utf-8");
    conn.write("welcome to " + count + " panter" + "\n \033[96mplease write your name enter: \033[39m");

    // 代表当前链接的昵称
    var nickname;

    //接受客户端传来的消息
    conn.on("data", function(data) {
        data = data.replace(/\r\n/g, '');
        console.log(data,66);
        if (!nickname) {
            if (users[data]) {
                conn.write("nickname is already in use , try again ");
                return;
            } else {
                nickname = data;
                users[nickname] = conn;

                broadcast('\033[96m' + nickname +"said:\033[39m"+data+'\n',false)
            }
        }else {
            
            broadcast('\033[96m' + nickname +"said:\033[39m"+data+'\n',true)
        }

    


    })

    //

    //关闭时触发
    conn.on('close', function() {
        count--;
        delete users[nickname]
        broadcast('\033[96m' + nickname +"left room now \033[39m"+'\n')
    })
    
    function broadcast (msg,expectMyself) {
        for(var i in users) {
            if(!expectMyself || i!=nickname) {
                users[i].write(msg)
            }
        }
    }
})

/**
 * @Author      ly
 * @method      [listen]
 * @description [description]
 * @DateTime    2017-10-18
 * @copyright   [copyright]
 * @license     [license]
 * @param       {[type]}
 * @return      {[type]}
 */
server.listen(4000, function() {
    console.log("\033[96m   server Listen on 4000 \033[39m");
})


```

# tcp-server


``` javascript

var qs = require('querystring');

require("http").createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    console.log(req.url);
    if('/'== req.url){
        res.end([
            '<form method="POST" action="/action">',
            '<h1>my form</h1>',
            '<fieldset>',
            '<legend>personal information</legend>',
            '<p>What is your name?</p>',
            '<input type="text" name="name"/>',
            '<p><input type="submit" name="submit" value="提交"/></p>',
            '</fieldset>',
            '</form>'
        ].join(''))

    } else if('/action' == req.url && 'POST' == req.method){

        var body = '';
        req.on('data',function(chunk){
            body+=chunk;
        });
        req.on('end',function(){
            res.write('<p> Your name is <b>'+qs.parse(body).name+'<b></p>');
            res.end('<p>Content-Type:'+req.headers['content-type']+'</p>'
                +'<p>Data:</p><pre>'+body+'</pre>');
        })
    } else {
        res.writeHead(404);
        res.end('<h1>Not Found</h1>');
    }
    
}).listen(4000);

```


