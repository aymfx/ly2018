/*
 * @Author: ly 
 * @Date: 2018-06-05 14:10:21 
 * @Last Modified by: ly
 * @Last Modified time: 2018-06-05 14:32:24
 */

var createError = require('http-errors');     
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const opn = require('opn');

const webpack = require('webpack');
const config = require('./build/webpack.base.conf');

const isDev = 'dev';

//给webpack带上配置
const compiler = webpack(config);
//自动更新编译代码中间件
const devMiddleWare = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    quiet: true,
});
//自动刷新浏览器中间件
const hotMiddleWare = require('webpack-hot-middleware')(compiler);

var app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 只记录状态码400以上的情况
app.use(logger('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}))

//创建日志目录
var logDirectory = path.join(__dirname, 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// 所有日志都记录
app.use(logger('common', {
    stream: fs.createWriteStream(path.join(logDirectory, 'request.log'), {
        flags: 'a'
    })
}))


if (isDev == 'dev') {
    app.use(devMiddleWare);
    app.use(hotMiddleWare);

    devMiddleWare.waitUntilValid(() => {
        console.log('构建开始...');
        opn('http://localhost:3000');
    });
    
} else {
    //路由控制
    app.get('/activity', (req, res, next) => {
        res.redirect('/');
    })

    app.put('/channel', function (req, res) {
        res.redirect('/');

    });

    app.use('/', express.static('h5'));

    app.use('/activity', express.static('activity'));

    app.use('/channel', express.static('channel'));

}

// 404
app.use(function (req, res, next) {
    next(createError(404));
});

// 错误句柄
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误页面
    res.status(err.status || 500);
    res.render('error', {
        status: err.status + ',如果页面存在，请联系管理员修复',
    });
});



module.exports = ap