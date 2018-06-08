---
title: async与await体验
date: 2017-02-11
tags: 异步
---

# async与await体验
> 第一次用es7的语法，在实际的开发中可能用的比较少，但是作为前端这也算是一个趋势，先留个坑，以后慢慢学习

## 基本语法

> async是一个异步的函数，通过它进行定义

> await只能用在async函数的里面，它的出现必须要等到一个promise返回结构才能继续执行



## 基本用法

```
const sleep = (time) => new Promise((resolve,reject) => {
		setTimeout(() => {
			  resolve("ok");
		},time)
})

const test = async() => {
       console.log("start");
       const ok = await sleep(3000);

       console.log(ok);

       console.log("end");
}

test();  //start   ok  end
```

## 捕捉错误



```
const sleep = (time) => new Promise((resolve,reject) =>{
		setTimeout(() => reject("你错了"),time)
})

const run = async() => {

	 try{

	 	console.log('start');
	 	await sleep(3000);
	 	console.log('end');

	 }catch(err){
		console.log(err);
	 }finally{
	 	console.log('over');
	 }
	 console.log('over1');
}

run();//	start  你错了  over  over1
```

## 循环多个await 它类似于同步代码 不用担心需要闭包才能解决问题


```
const sleep = (time) => new Promise((resolve,reject) =>{
		setTimeout(() => resolve(true),time)
})

var run = async() => {
		for (let i = 0;i<3;i++) {
			  console.log(`当前是第${i}次等待..`);
			  await sleep(1000);
		}
}


run();//当前是第0次等待..	当前是第1次等待..	当前是第2次等待..
```

## async返回的是什么  返回的是promise对象！！！！


```
const add =async() => {
		return "hello world"
}

console.log(add()); //Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "hello world"}

add().then((value)=>console.log(value));  //hello world
```


