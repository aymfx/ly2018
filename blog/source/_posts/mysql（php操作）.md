---
title: mysql（php操作）
date: 2016-10-05
tags: mysql
---

# 警告：
	装mysql和卸载mysql要小心谨慎，心塞啊
# mysql基本概念
## 什么是数据库？
		数据库（Database）是按照数据结构来组织、存储和管理数据的仓库，每个数据库都有一个或多个不同的API用于创建，访问，管理，搜索和复制所保存的数据。我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理的大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。
## RDBMS即关系数据库管理系统(Relational Database Management System)的特点

 - 数据以表格的形式出现
 - 每行为各种记录名称
 - 每列为记录名称所对应的数据域
 - 许多的行和列组成一张表单
 - 若干的表单组成database
 
 ## 术语
	 数据库: 数据库是一些关联表的集合。.
	数据表: 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。
	列: 一列(数据元素) 包含了相同的数据, 例如邮政编码的数据。
	行：一行（=元组，或记录）是一组相关的数据，例如一条用户订阅的数据。
	冗余：存储两倍数据，冗余可以使系统速度更快。
	主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
	外键：外键用于关联两个表。
	复合键：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
	索引：使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。
	参照完整性: 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性。
## 下载
https://www.mysql.com/downloads/
# 安装mysql
	小心就好，注意选择utf-8，用户名和密码记住，path要添加到系统上去
# MySQL数据库过程中常用的命令
USE 数据库名

	选择要操作的MySQL数据库，使用该命令后所有MySQL命令都只针对该数据库。

```
mysql> use ly;
Database changed
```

show databases  数据库名
	
	列出 MySQL 数据库管理系统的数据库列表

```
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| RUNOOB             |
| cdcol              |
| mysql              |
| ly                 |
|           		 |
+--------------------+
```
SHOW TABLES

		显示指定数据库的所有表，使用该命令前需要使用 use 命令来选择要操作的数据库

```
mysql> use RUNOOB;
Database changed
mysql> SHOW TABLES;
+------------------+
| Tables_in_runoob |
+------------------+
| employee_tbl     |
| runoob_tbl       |
| tcount_tbl       |
+------------------+
```
SHOW COLUMNS FROM 数据表

	显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。
	
```
mysql> SHOW COLUMNS FROM ly_table;
```
SHOW INDEX FROM 数据表
	
	显示数据表的详细索引信息，包括PRIMARY KEY（主键）

```
mysql> SHOW INDEX FROM ly_table;
```
SHOW TABLE STATUS LIKE 数据表\G
	 
	 该命令将输出MySQL数据库管理系统的性能及统计信息
```
mysql> SHOW TABLE STATUS  FROM RUNOOB;   # 显示数据库 RUNOOB 中所有表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%';     # 表名以runoob开头的表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%'\G;   # 加上 \G，查询结果按列打印
```
# php操作mysql

## 链接数据库

``` bash
//连接数据库
	 $conn=mysql_connect('localhost','root','123456');
	/*
	 * 第一参数：地址 	localhost代表本地
	 * 第二参数:用户名 	默认root
	 *第三个参数：密码	123456
	 *  */
	 //判断是否链接
	 if(!$conn){
	 	die('不能链接呀：'.mysql_error());
	 }
	 //关闭数据库链接
	 mysql_close($conn);
	 
```
## 操作数据库
###  创建数据库
1.mysql下创建数据库
	
``` bash 
	mysql> create database ly ;
	Query OK, 1 row affected (0.00 sec)
```
2.php创建数据库名，删除，选择

``` bash
//设置字符集
header('Content-Type:text/html;charset="utf-8"');
 //创建数据库  mysql下：'create database 数据库名
	 $sql='create database ly';
	 $retval=mysql_query($sql,$conn);//1.sql语句2.链接对象
	 if(!$retval){
	 	die('创建失败'.mysql_error());
	 }
	 
	 //选择数据库  mysql下：use 数据库名
	 $flag=mysql_select_db("ly",$conn);//1.选择的数据库2.连接对象
	 if(!$flag){
	 	die('选择失败'.mysql_error());
	 }
	 
	//删除数据库 mysql下：drop database 数据库名
	$sql='drop database ly';
	$retval=mysql_query($sql,$conn);
	if(!$retval){
	 	die('删除数据库失败'.mysql_error());
	 }
```
## MySQL 数据类型
### 基本类型
![](http://img.blog.csdn.net/20170307163644473?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjkxMDQ5OTk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 日期和时间类型
![这里写图片描述](http://img.blog.csdn.net/20170307163801852?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjkxMDQ5OTk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
### 字符串类型
![这里写图片描述](http://img.blog.csdn.net/20170307163853868?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjkxMDQ5OTk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 操作数据表
### mysql语法

``` bash
mysql> use ly;
Database changed
mysql> CREATE TABLE w3cschool_tbl(
   -> ly_id INT NOT NULL AUTO_INCREMENT,
   -> ly_title VARCHAR(100) NOT NULL,
   -> ly_author VARCHAR(40) NOT NULL,
   -> submission_date DATE,
   -> PRIMARY KEY ( ly_id )
   -> );
Query OK, 0 rows affected (0.16 sec)
```

``` bash
//创建表结构
	 $sql="create table yueguang(".
	 "yg_id tinyint not null auto_increment, ".
	 "yg_title varchar(100) not null, ".
	 "yg_atuhor varchar(40) not null, ".
	 "sub_date DATE, ".
	 "primary key (yg_id));";
	 $retval=mysql_query($sql,$conn);
	 if(!$retval){
	 	die('创建表失败'.mysql_error());
	 }
```

``` bash
 //删除表
	/*$sql='drop table yueguang';
	$retval=mysql_query($sql,$conn);
	if(!$retval){
	 	die('删除数据表失败'.mysql_error());
	 }*/
```

``` bash

mysql_query('SET NAMES UTF8');//设置字符集
$sql="create table yueguang(".
	 "yg_id tinyint not null auto_increment, ".
	 "yg_title varchar(100) not null, ".
	 "yg_atuhor varchar(40) not null, ".
	 "sub_date DATE, ".
	 "primary key (yg_id));";
	 $retval=mysql_query($sql,$conn);
	 if(!$retval){
	 	die('删除数据库失败'.mysql_error());
	 }
$sql='drop table yueguang';
	$retval=mysql_query($sql,$conn);
	if(!$retval){
	 	die('删除数据表失败'.mysql_error());
	 }
$sql="insert into ly.yueguang(yg_title,yg_atuhor,sub_date) ".
	 "values('从你的全世界路过','张嘉佳',NOW());";
	 $retval=mysql_query($sql,$conn);
	 if(!$retval){
	 	die('插入失败'.mysql_error());
	 }
```

``` bash
 //查询数据
	 $sql="select yg_id,yg_title,yg_atuhor,sub_date ".
	 "from ly.yueguang";
	 $result=mysql_query($sql,$conn);
	 if(!$result){
	 	die('查询失败'.mysql_error());
	 }
	 //mysql_fetch_array: 从结果集中取得一行作为关联数组，或数字数组，或二者兼有
	 //1.结果集 2.可选参数
	 
	 //MYSQL_NUM 
	 //print_r(mysql_fetch_array($result,MYSQL_NUM));
	 //显示数字Array ( [0] => 1 [1] => 挪威森林 [2] => 村上春树 [3] => 2017-03-07 )
	 //MYSQL_ASSOC
	 //print_r(mysql_fetch_array($result,MYSQL_ASSOC));
	 //显示属性：Array ( [yg_id] => 1 [yg_title] => 挪威森林 [yg_atuhor] => 村上春树 [sub_date] => 2017-03-07 )
	 
	 //MYSQL_BOTH  默认
	//print_r(mysql_fetch_array($result));
	 //Array ( [0] => 1 [yg_id] => 1 [1] => 挪威森林 [yg_title] => 挪威森林 [2] => 村上春树 [yg_atuhor] => 村上春树 [3] => 2017-03-07 [sub_date] => 2017-03-07 )
	 
	 while($rows=mysql_fetch_array($result,MYSQL_ASSOC)){
	 	echo "我的id{$rows['yg_id']}:{$rows['yg_title']}:{$rows['yg_atuhor']}:{$rows['sub_date']} </br>";
	 }
/*	我的id1:挪威森林:村上春树:2017-03-07 
	我的id2:我的太阳:我的:2017-03-07 
	我的id3:从你的全世界路过:张嘉佳:2017-03-07 */
	
```
## 各种查询方法
### MySQL where 子句

``` bash
//where
	$sql="select yg_id,yg_title,yg_atuhor,sub_date ".
	 "from ly.yueguang where yg_id=2 ";
	 $result=mysql_query($sql,$conn);
	 if(!$result){
	 	die('查询失败'.mysql_error());
	 }
	
	while($rows=mysql_fetch_array($result,MYSQL_ASSOC)){
	 	echo "我的id{$rows['yg_id']}:{$rows['yg_title']}:{$rows['yg_atuhor']}:{$rows['sub_date']} </br>";
	 }
	//我的id2:我的太阳:我的:2017-03-07 
```

``` bash
//updata更新数据
	 $sql="update ly.yueguang set yg_title='我要太阳'".
	 "where yg_id=2 ";
	 $result=mysql_query($sql,$conn);
	 if(!$result){
	 	die('更新失败'.mysql_error());
	 }
	 
	 $sql="select yg_id,yg_title,yg_atuhor,sub_date ".
	 "from ly.yueguang where yg_id=2 ";
	 $result=mysql_query($sql,$conn);
	 if(!$result){
	 	die('查询失败'.mysql_error());
	 }
	
	while($rows=mysql_fetch_array($result,MYSQL_ASSOC)){
	 	echo "我的id{$rows['yg_id']}:{$rows['yg_title']}:{$rows['yg_atuhor']}:{$rows['sub_date']} </br>";
	 }
```

``` bash
//删除数据项
	$sql="delete from ly.yueguang where yg_id=2";
	$result=mysql_query($sql,$conn);
	 if(!$result){
	 	die('删除数据项'.mysql_error());
	 }
```

``` bash
 //like匹配
	 $sql="select * from ly.yueguang where yg_atuhor like '%村%'";
	$result=mysql_query($sql,$conn);
	 if(!$result){
	 	die('查找数据项'.mysql_error());
	 }
	 while($rows=mysql_fetch_array($result,MYSQL_ASSOC)){
	 	echo "我的id{$rows['yg_id']}:{$rows['yg_title']}:{$rows['yg_atuhor']}:{$rows['sub_date']} </br>";
	 }
	 
	 //我的id1:挪威森林:村上春树:2017-03-07 
```
 

``` bash
//排序
	  $sql="select * from ly.yueguang order by yg_id desc";
	$result=mysql_query($sql,$conn);
	 if(!$result){
	 	die('查找数据项'.mysql_error());
	 }
	 while($rows=mysql_fetch_array($result,MYSQL_ASSOC)){
	 	echo "我的id{$rows['yg_id']}:{$rows['yg_title']}:{$rows['yg_atuhor']}:{$rows['sub_date']} </br>";
	 }
	 
	 /*我的id5:你的孤独虽败犹荣:刘同:2017-03-07 
我的id4:摆渡人:佚名:2017-03-07 
我的id3:从你的全世界路过:张嘉佳:2017-03-07 
我的id1:挪威森林:村上春树:2017-03-07 */

desc降序
asc升序
```

## 小结
暂时就写到这里，对于登录验证应该是够了，以下是学习的网站
http://www.w3cschool.cn/mysql/mysql-group-by-statement.html