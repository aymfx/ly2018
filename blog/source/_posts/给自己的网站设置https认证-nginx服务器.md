---
title: 给自己的网站设置https认证(nginx服务器)
date: 2018-01-17 20:15:46
tags: node
---

![美女](https://aymfx.github.io/img/a201801/d.png)




### 网站进行认证操作1
> 进入腾讯云选择ssl安装服务
![美女](https://aymfx.github.io/img/a201801/d1.png)


### 下载证书

![美女](https://aymfx.github.io/img/a201801/d2.png)

### 包含如下东西

>Nginx文件夹内获得SSL证书文件 1_www.domain.com_bundle.crt 和私钥文2_www.domain.com.key

> 1_www.domain.com_bundle.crt 文件包括两段证书代码 “-----BEGIN CERTIFICATE-----”和“-----END CERTIFICATE-----”,

 > 2_www.domain.com.key 文件包括一段私钥代码“-----BEGIN RSA PRIVATE KEY-----”和“-----END RSA PRIVATE KEY-----”。

### 证书安装 

![美女](https://aymfx.github.io/img/a201801/d3.png)

### 文件配置
>  vim  /usr/local/nginx/conf/nginx.conf

![美女](https://aymfx.github.io/img/a201801/d4.png)

### 这是官方示例

````
server {
        listen 443;
        server_name www.domain.com; #填写绑定证书的域名
        ssl on;
        ssl_certificate 1_www.domain.com_bundle.crt;
        ssl_certificate_key 2_www.domain.com.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
        ssl_prefer_server_ciphers on;
        location / {
            root   html; #站点目录
            index  index.html index.htm;
        }
    }
````

### 配置参数

配置文件参数 说明
listen 443 SSL访问端口号为443
ssl on 启用SSL功能
ssl_certificate 证书文件
ssl_certificate_key 私钥文件
ssl_protocols 使用的协议
ssl_ciphers 配置加密套件，写法遵循openssl标准

### 重启
> /usr/local/nginx/sbin/nginx -s reload


###如图
![美女](https://aymfx.github.io/img/a201801/d5.png)































