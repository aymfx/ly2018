---
title: linux环境下安装nginx
date: 2018-01-15 22:00:42
tags: node
---


![美女](https://aymfx.github.io/img/a201801/b1.jpg)
# 前言

> 由于需要我自己有几个二级域名需要配置，还有多起几个node服务用nginx做方向代理，使得二级域名可以访问自己所在的目录

### 安装

1. 安装gcc（centos 7之后一般已自带，可以在第6步失败后再安装）

> yum install gcc gcc-c++
 
2. 安装pcre

> yum install -y pcre pcre-devel
 
3. 安装zlib
 
> yum install -y zlib zlib-devel
 
4. 安装openssl

> yum install -y openssl openssl-devel
 
5. 下载并解压Nginx（之后进入Nginx目录

> wget http://nginx.org/download/nginx-1.9.8.tar.gz //(可以装最新版本)

> tar zxvf nginx-1.9.8.tar.gz

> cd zxvf nginx-1.9.8
 
6. 编译Nginx（加载常用模块如ssl）

>./configure --prefix=/usr/local/nginx >--with-http_stub_status_module --with-http_gzip_static_module >--with-http_ssl_module
 
7. 安装Nginx

> make && make install
 
8. 启动

>/usr/local/nginx/sbin/nginx
 
9. 停止

>/usr/local/nginx/sbin/nginx -s stop（reload表示重启）
 
10. 浏览器访问Nginx所在机器IP，验证Nginx启动成功

>http://yourhost/

![美女](https://aymfx.github.io/img/a201801/b3.png)
 
 
注：Nginx配置文件位置

> /usr/local/nginx/conf/nginx.conf


##修改配置文件实现反向代理

1.进入配置文件

> vim /usr/local/nginx/conf/nginx.conf

> 找到下面的地方

![美女](https://aymfx.github.io/img/a201801/b4.png)


> 标红的地方进行修改，其余注释

![美女](https://aymfx.github.io/img/a201801/b5.png)


> 浏览器显示

![美女](https://aymfx.github.io/img/a201801/b6.png)