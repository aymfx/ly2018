---
title: node-review
date: 2017-08-01
tags: node
---

# 建一个简单的express
> 对于学习node的人来说首先node安装是必备的，这里就跳过了

> http://expressjs.com/  它的官网

> 安装 express npm i express

> 新建一个app.js文件，写以下的代码


```

//引入 `express` 模块
var express = require('express'); 

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量

var app = express(); 

//调用get方法，当我们访问/这个根目录时，我们会执行回调，send用于向网页输出字符串
app.get('/', function(req, res) {
    res.send('Hello,world');
})
// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(3000, function() {
    console.log("app is listen at port 3000");
})
```
> 参考

> // app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。

> // 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。

> // request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。

> // res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。

> 执行 node app.js

> 然后在浏览器地址栏输出> http://localhost:3000/

# 学习使用外部模块

> npm init 初始化

> cnpm i express utility -S 安装两个依赖块

> https://github.com/node-modules/utility  utility是一个工具类，在这个地方用于加密哦

> 新建一个app.js文件，写以下的代码

```
var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res) {
    //query用来获取地址栏后面的参数
    var message = req.query.message;
    //使用工具函数进行加密处理
    var md5Value = utility.md5(message);
    res.send(md5Value);

});

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000')
})
```

> 执行 node app.js

> 然后在浏览器地址栏输出> http://localhost:3000/?message='liuyang'

# 使用 superagent 与 cheerio 完成简单爬虫

> superagent  superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。

> cheerio   (https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

> 新建一个app.js文件，写以下的代码


```
var express = require('express')
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res, next) {
    //用superagent去抓取页面内容
    superagent.get('http://www.qdfuns.com/').end(function(err, sres) {
        if (err) {
            return next(err)
        }
        //加载取到的页面，然后创建一个类似jquery的实例
        var $ = cheerio.load(sres.text);

        var items = [];
        $(".media-body").each(function(idx, ele) {
            var $ele = $(ele);
            items.push({
                title: $ele.text()
            })
        })

        res.send(items);

    })



})

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000')
})
```
> 利用这两个模块，我们能抓取我们所需要的数据

# 使用 eventproxy 控制并发

> 这一小节内容，利用eventproxy，实现并发抓取1+40,1就是抓取40个主题，40是抓取每个主题链接下面的评论，也就是说我们要发起1+40个请求，后四十个请求一起发起

> eventproxy  https://github.com/JacksonTian/eventproxy    并发执行异步回调，移除被广为诟病的深度callback嵌套问题，将串行等待变成并行等待，提升多异步协作场景下的执行效率


> eventproxy 提供了不少其他场景所需的 API，但最最常用的用法就是以上的这种，即：

> 先 var ep = new eventproxy(); 得到一个 eventproxy 实例。

> 告诉它你要监听哪些事件，并给它一个回调函数。ep.all('event1', 'event2', function (result1, result2) {})。

> 在适当的时候 ep.emit('event_name', eventData)。


```
var express = require('express')
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var cnodeUrl = 'https://cnodejs.org/'
var app = express();
var topicUrls = [];
var topicsS = [];
app.get('/', function(req, res, next) {


    superagent.get(cnodeUrl).end(function(err, sres) {
        if (err) {
            return next(err)
        }
        var $ = cheerio.load(sres.text);

        $("#topic_list .topic_title").each(function(idx, ele) {
            var $ele = $(ele);
            //url.resolve，可以补全前面的域名，进行拼接操作
            var href = url.resolve(cnodeUrl, $ele.attr('href'));
            topicUrls.push(href);
        })


        topicUrls.forEach(function(topiculr) {
            superagent.get(topiculr).end(function(err, res) {
                console.log("fetch" + topiculr + 'successful');
                ep.emit('topic_html', [topiculr, res.text])
            })
        })

        //创建一个eventproxy实例
        var ep = new eventproxy();
        //这个表示重复监听topic_html事件40次后执行回调函数
        ep.after('topic_html', topicUrls.length, function(topics) {
            console.log(1212);
            //它将emit过来东西全部保存在数组里，然后用map将它遍历
            topicsS = topics.map(function(topicPair) {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    commit1: $('.reply_content').eq(0).text().trim()
                })
            })

            res.send(topicsS);
        })



    })
})

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000')
})
```

# 使用 async 控制并发

> async https://github.com/caolan/async 用于延迟并发，减少一起并发导致网站出问题


```
var async = require('async');

var concurrencyCount = 0;

//模拟假的数据请求，返回一个callback值

var fetchUrl = function(url, callback) {
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    setTimeout(function() {
        concurrencyCount--;
        //用这个做拼接
        callback(null, url + 'html content')
    }, delay)
};

var urls = [];

for (var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}
//限制并发的次数
async.mapLimit(urls, 5, function(url, callback) {
    fetchUrl(url, callback);
}, function(err, result) {
    console.log('final:');
    //最终结果汇总
    console.log(result);
})
```

# 测试用例：mocha，should，istanbul

> 学习使用测试框架 mocha : http://mochajs.org/

> 学习使用断言库 should : https://github.com/tj/should.js

> 学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul

> 简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886

> 学习使用断言库 expect :https://github.com/LearnBoost/expect.js/ 

> 先建一个文件 main.js


```
var fibonacci = function(n) {
    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
};

if (require.main === module) {
    // 如果是直接执行 main.js，则进入此处
    // 如果 main.js 被其他文件 require，则此处不会执行。
    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') is', fibonacci(n));
}

exports.fibonacci = fibonacci;
```

> 在同级目录下建一个文件夹命名必须为test 在它的子目录建一个文件main-test.js


```
var main = require('../main');
var should = require('should');

describe('test/main.test.js', function() {
    it('should equal 0 when n === 0', function() {
        main.fibonacci(0).should.equal(0);
    });

    it('should equal 1 when n === 1', function() {
        main.fibonacci(1).should.equal(1);
    });

    it('should equal 55 when n === 10', function() {
        main.fibonacci(10).should.equal(55);
    });

    it('should throw when n > 10', function() {
        (function() {
            main.fibonacci(11);
        }).should.throw('n should <= 10');
    });

    it('should throw when n < 0', function() {
        (function() {
            main.fibonacci(-1);
        }).should.throw('n should >= 0');
    });

    it('should throw when n isnt Number', function() {
        (function() {
            main.fibonacci('呵呵');
        }).should.throw('n should be a Number');
    });
});
```
> 由于node的计算能力以及边界值得原因后三个可能过不了，需要修补下代码


```
var fibonacci = function (n) {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0');
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fibonacci(n-1) + fibonacci(n-2);
};
```

> 测试用例的覆盖率

> 安装  npm i istanbul -g

> 执行 $ istanbul cover _mocha （有大问题，window有坑）

# 浏览器端测试：mocha，chai，phantomjs

> 学习使用测试框架 mocha 进行前端测试 : http://mochajs.org/

> 了解全栈的断言库 chai: http://chaijs.com/

> 了解 headless 浏览器 phantomjs: http://phantomjs.org/

> 第一步需要安装mocha cnpm i mocha -g

> 初始化mocha mocha init .

> 会生成几个初始化的文件

> 引入chai,在index.html


```
<!--引入 断言库 chaijs -->
    <script src='https://cdn.rawgit.com/chaijs/chai/master/chai.js'></script>
    
<!--需要测试的代码-->
    <script>
        var fibonacci = function(n) {
            if (n === 0) {
                return 0;
            }
            if (n === 1) {
                return 1;
            }
            return fibonacci(n - 1) + fibonacci(n - 2);
        };
```

> 在test.js中写测试用例


```
var should = chai.should();

describe('我只是一个测试', function() {
    it("测试是否等于0", function() {
        window.fibonacci(0).should.equal(0);
    })
})
```

> 运行index看结果

> 测试反馈

> 初始化 npm init 

> 安装依赖 cnpm i mocha-phantomjs --save-dev

> 在package.json 加入这么一句话


```
"scripts": {
  "test": "mocha-phantomjs index.html --ssl-protocol=any --ignore-ssl-errors=true"
},
```
> npm test







































