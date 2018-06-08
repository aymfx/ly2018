---
title: node.js开发指南笔记5(express
date: 2017-08-15 17:37:28
tags: node 
---

# app.js

``` javascript

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// morgan中间件记录日志
var logger = require('morgan');

//cookie存储 
var cookieParser = require('cookie-parser');

// 可以通过body-parser 对象创建中间件，当接收到客户端请求时所有的中间件都会给req.body 添加属性，请求体为空，则解析为空{} （或者出现错误）。
var bodyParser = require('body-parser');

// 配置路由
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 目录的配置    path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 设置小图标icon
app.use(favicon(path.join(__dirname, 'public', 'icon.ico')));

// 可以将请求信息打印在控制台，便于开发调试
app.use(logger('dev'));

//生产环境则需要这么做,打印到log日志里面，在根目录
// app.use(logger('combined', {stream : accessLog}));

// 这个方法返回一个仅仅用来解析json格式的中间件。这个中间件能接受任何body中任何Unicode编码的字符。支持自动的解析gzip和 zlib。
app.use(bodyParser.json());

// 这个方法也返回一个中间件，这个中间件用来解析body中的urlencoded字符， 只支持utf-8的编码的字符。同样也支持自动的解析gzip和 zlib
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// 设置可以访问的静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// 捕捉404事件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误事件处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染页面错误
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```


