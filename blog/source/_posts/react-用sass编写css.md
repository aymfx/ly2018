---
title: react - 用sass编写css
date: 2017-07-19
tags: react
---

# 前言
> 这适用于create-react-app配置的react开发环境，

# 第一步安装编译所需的依赖
> npm install sass-loader node-sass --save-dev 

# 在node_modules/react-scripts/config下找到 webpack.config.dev.js 文件

# 在exculde中添加scss，用来匹配scss文件


```
exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.scss$/,//这里添加
        ],
```

# 这里添加sass配置文件

```
{
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
},


//  编译sass
      {
         test:/\.scss$/,
         loaders: ['style-loader', 'css-loader', 'sass-loader'],
},
```

> 这是开发环境的配置，如需在生产环境开发只需在webpack.config.prod.js做同样的配置

> 配置完成后记得重新运行命令 npm start or yarn start




