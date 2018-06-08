---
title: linux下安装mysql
date: 2018-01-16 23:35:41
tags: node
---

![美女](https://aymfx.github.io/img/a201801/c.jpg)

# 前言

> node有对mysql操作的插件，可以先装起来用，下节我会装好mongose，这是非关系型数据库，很适合node


1. 下载最新版

>wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz

 
2. 解压进入文件夹

> tar -zxvf mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz

> cd mysql-5.7.21-linux-glibc2.12-x86_64

3. 添加用户组和用户

 - 添加用户组

> groupadd mysql

 - 添加用户mysql 到用户组mysql

> useradd -g mysql mysql


4. 创建放数据的文件库

> mkdir -p ./data/mysql

5.初始化mysql

> ./bin/mysqld --user=root --basedir=./data --datadir=./data/mysql --initialize  (检查好路劲对不对，基本常识哈)

 - 报错了,出现如下情况

![美女](https://aymfx.github.io/img/a201801/c1.png)

> Centos系统执行:yum -y install numactl

> ubuntu: sudo apt-get install numactl

6.初始化成功并且初始密码出来了

![美女](https://aymfx.github.io/img/a201801/c2.png)


7.建立配置文件

> cd support-files

> vim mysql.server

> 修改成如下

![美女](https://aymfx.github.io/img/a201801/c3.png)

8.拷贝到系统目录

> cp mysql.server /etc/init.d/mysqld

> chkconfig --add mysqld

>启动

> service mysqld start/stop(这是停止哈，别傻乎乎写上去)

 - 呀，报错了

![美女](https://aymfx.github.io/img/a201801/c4.png)

 - 解决方式

> 百度了下似乎是权限不够无法读取文件于是采用了百度推荐的方式

 - mkdir -p /var/log/mariadb/
 - cd /var/log/mariadb/
 - touch mariadb.log
 - chmod -R 775 mariadb.log
 - chown -R mysql:mysql mariadb.log

> 再一次运行命令service mysqld start

  - 又报错了

![美女](https://aymfx.github.io/img/a201801/c5.png)

> 又是权限问题

 - mkdir   /var/lib/mysql 
 - chmod 777  /var/lib/mysql

> agian

 - 妈呀，又报错了

![美女](https://aymfx.github.io/img/a201801/c6.png)

> 没办法删除了etc/my.cnf

> rm -rf /etc/my.cnf

>成功 开心

![美女](https://aymfx.github.io/img/a201801/c7.png)


## 设置全局的mysql

> vim ./etc/profile

![美女](https://aymfx.github.io/img/a201801/c9.png)


> source ./etc/profile



## 修改初始化密码

> mysql -uroot -p

 - 如图键入命令修改


![美女](https://aymfx.github.io/img/a201801/c8.png)


## 后记

> mysql是我比较恐惧的一块，在window安装我都老是出问题，第一次只花了3个小时装完了感觉很开心，嘿嘿，睡觉了，明天还要上班。
