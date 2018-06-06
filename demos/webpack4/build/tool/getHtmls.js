/*
 * 获取打包页面的html
 * @作者: ly 
 * @创建时间: 2018-05-23 15:27:46 
 * @最后修改的人:   ly 
 * @最后修改的时间: 2018-05-23 15:27:46 
 */

var path = require('path')
var fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmls = []; // 入口获取
const getFilePath = (path) => {
    const files = fs.readdirSync(path); /* 读取目录下的所有文件名称，返回名称数组，如果文件名是目录，该目录下面的文件不会读取 */
    files.map((item, i) => {
        const tmpPath = `${path}/${item}`;
        const stats = fs.statSync(tmpPath);
        if (stats.isDirectory()) { // 如果是目录，则继续递归执行
            getFilePath(tmpPath);
        } else {
            /(main|index)\.html$/.test(tmpPath) && htmls.push(tmpPath); // 只获取.html
        }
    });
};

const jsDir = path.resolve(__dirname, '../../source');
getFilePath(jsDir)
console.log(htmls)
const getHtmls = () => {
    const html = [];
    htmls.map(ele => {
        const name = ele.slice(0, -5).replace(jsDir, '');
        const templateurl = '\source' + ele.replace(jsDir, '');
        console.log(templateurl, 221)
        html.push(new HtmlWebpackPlugin({
            template: templateurl,
            filename: `${name}.html`,
            chunks: [`${name}`],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true

            }
        }))
    })
    return html;

};

console.log('-------------来自getHtmls---------------')
getHtmls()
console.log('-------------来自getHtmls---------------')
module.exports = getHtmls()