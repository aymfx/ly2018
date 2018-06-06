/*
 *  获取打包页面的入口
 * @作者: ly 
 * @创建时间: 2018-05-22 16:42:42 
 * @最后修改的人:   ly 
 * @最后修改的时间: 2018-05-22 16:42:42
 */
var glob = require('glob')
var path = require('path')
var fs = require('fs')

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true?http://localhost:3000';

/* var entries = function () {
    var jsDir = path.resolve(__dirname, '../../source')
    
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var map = {};
    console.log(jsDir, entryFiles)
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
} */




/* module.exports = ()=>{
    
    const files = fs.readdirSync(path);

} */

const entries = []; // 入口获取
const getFilePath = (path) => {
    const files = fs.readdirSync(path); /* 读取目录下的所有文件名称，返回名称数组，如果文件名是目录，该目录下面的文件不会读取 */
    files.map((item, i) => {
        const tmpPath = `${path}/${item}`;
        const stats = fs.statSync(tmpPath);
        if (stats.isDirectory()) { // 如果是目录，则继续递归执行
            getFilePath(tmpPath);
        } else {
            /(main|index)\.js$/.test(tmpPath) && entries.push(tmpPath); // 只获取js
        }
    });
};

const jsDir = path.resolve(__dirname, '../../source/');

getFilePath(jsDir);

/**
 * 获取webpack 入口
 * @param  {[type]} type [类别 production=> 生产环境]
 * @return {[type]}      [description]
 */
const getEntries = () => {
    const entry = {

    };
    entries.map(ele => {
            const name = ele.slice(0, -3).replace(jsDir,'');
            ele = [hotMiddlewareScript,ele]
            entry[name] = ele;
    })
    return entry;
};

console.log('-------------来自getEntries---------------')
console.log(getEntries())
console.log('-------------来自getEntries---------------')
module.exports = getEntries;