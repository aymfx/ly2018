---
title: 用linux服务器搭建node环境（安装node）
date: 2018-01-13 20:07:09
tags: node
---


![美女](https://aymfx.github.io/img/a201801/b.jpg)
# 前言

> 双十一买了台服务，装的是linux系统，配置比较低，但是自己个人学习还是够用了。

# 准备 安装的服务

> node nginx mysql mongose 

###  安装node

> 下载最新版本的node

> ==wget https://npm.taobao.org/mirrors/node/v9.4.0/node-v9.4.0-linux-x64.tar.gz==

> 解压

> ==tar -xvf  node-v9.4.0-linux-x64.tar.gz==

> 进入页面查看是否安装好了

> ==cd  node-v9.4.0-linux-x64/bin==

> ==./node -v==  //查看版本

> 添加全局变量

> ==vim /etc/profile==

> 添加下面两条 (大家按实际的路径来走) 我的路径如下

> ==export NODE_HOME=/usr/local/ly/node/node-v9.4.0-linux-x64==

> ==export PATH=$NODE_HOME/bin:$PATH==

>编译 

> ==source /etc/profile==

> 验证是否成功

> ==node -v==


### pm2的安装

>pm2 是一个带有负载均衡功能的Node应用的进程管理器.
当你要把你的独立代码利用全部的服务器上的所有CPU，并保证进程永远都活着，0秒的重载， PM2是完美的。它非常适合IaaS结构，但不要把它用于PaaS方案（随后将开发Paas的解决方案）

### pm2常用命令

> $ npm install pm2 -g     # 命令行安装 pm2 

> $ pm2 start app.js -i 4 
 - 后台运行pm2，启动4个app.js
 - 也可以把'max' 参数传递给 start
 - 正确的进程数目依赖于Cpu的核心数目
                                
>$ pm2 start app.js --name my-api # 命名进程

> $ pm2 list               # 显示所有进程状态

> $ pm2 monit              # 监视所有进程

> $ pm2 logs               #  显示所有进程日志

> $ pm2 stop all           # 停止所有进程

> $ pm2 restart all        # 重启所有进程

> $ pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)

> $ pm2 stop 0             # 停止指定的进程

> $ pm2 restart 0          # 重启指定的进程

> $ pm2 startup            # 产生 init 脚本 保持进程活着

> $ pm2 web                # 运行健壮的 computer API endpoint 

>$ pm2 delete 0           # 杀死指定的进程

>$ pm2 delete all         # 杀死全部进程


## 安装pm2并且调试下

> 安装淘宝镜像

> ==npm install -g cnpm --registry=https://registry.npm.taobao.org==

> 全局安装pm2

> ==cnpm i -g pm2==

> 是否安装成功

> pm2 -v


## 跑一个小型服务器

>在linux下创建一个demo文件夹

> cd demo 

> 创建一个app.js 文件

> 内容如下

![app.js](https://aymfx.github.io/img/a201801/b.png)

> pm2 start app.js

> 浏览器访问如下

![app.js](https://aymfx.github.io/img/a201801/b1.png)


# 下一接我们继续