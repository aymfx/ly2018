---
title: git温习
date: 2016-10-08
tags: git
---

#Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
#安装
	需要下载:Git-2.10.0-64-bit.exe

#配置
	ssh 配置：Git GUI --- 帮助 ---show ssh key--拷贝
	进入 github -- 右上角 -- setting -- SSH and GPG keys
	利用命令:ssh-keygen -t rsa -C “你的邮箱”
##配置个人用户信息和电子邮件地址

``` bash
	git config --global user.name “ ”
	git config --global user.email “ ”
	git config --list (查看所有配置项)
	git commit --amend --author='Your Name ' 修改用户名
```

# 常用的命令
### 命令查看
	 git config --list
### 1. GIT （工作区/暂存区/版本git clone [url] ： 取远git status（查看当前状态） 取代码之后本地代码哪些发生改变
git  add filename（将文件从工作区添加到暂存区）
git add .（上面的简写，所有的文件）
git commit -m "注释" （将缓存区的文件放到版本区）
git reset HEAD filename 撤销操作：将 filename 从暂存区撤回到工作区。
git remote 获取远程仓库的名称 origin（远程仓库的名称可以修改的）
git remote -v 获取远程仓库的地址这里写代码片
git push origin master(分支) 将本地资源同步到远程仓库2、例如：工作区的文件删除了，可以通过此命令还原 checkout commit_id （commit_id log 信息 id 名称。）
git log 日志 操作情况
git ls-files：查看暂存区的文件
```
### 3、对比：查看三个分区的差异

``` bash
git diff 对比的是工作区和暂存区代码的不同
git diff --cached（--staged） 对比的是暂存区与版本库代码的不同
git diff master 对比的是工作区与版本库代码的不同
```
### 4、删除：

	git rm filename 删除暂存区的文件，前提是工作区已经删除此文件了。
	git rm -f filename 删除暂存区和工作区的文件。
	git rm --cached filename 删除暂存区的文件，不会删除工作区。
### 5、多人协作解决冲突：同步更新远程仓库里面的代码
	

``` bash
	git fetch 将远程中的代码与本地代码手动合并
	git fetch 显示冲突
	git diff master origin/master 对比代码 显示区别
	git merge origin/master 手动合并
	git pull 将远程中的代码与本地代码自动合并(commit)
```
### 6、分支

``` bash
	git branch 查看分支
	git branch new1 创建分支
	git checkout new1 切换分支
	git merge new1 合并分支
	git checkout -b new2 创建并切换分支（组合的写法）
	git branch --merged 查看当前分支下合并的分支
	git branch --no-merged 查看当前分支下没有合并的分支
	git branch -d new1 删除一个与当前分支合并下的分支。
	git branch -D new2 强制删除一个本地分支
	git push origin :branchname 删除远程创库的分支。
```
# 标签

``` bash
	git tag v1.0
	git push origin v1.0
```
# 创建分支
 
``` bash
	git branch new1
	git push origin master
```
