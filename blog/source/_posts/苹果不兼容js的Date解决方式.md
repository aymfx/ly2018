---
title: '''苹果不兼容js的Date解决方式'''
date: 2017-11-06 17:58:36
tags: js兼容
---

## 活动出的问题
|
> 写活动的时候遇到了个坑，就是在苹果上将2017-11-06转成时间戳，返回的是NaN，安卓没啥问题。

## 百度一下问题

> iPhone中的safari无法解释 YYYY-MM-DD HH:mm:ss 或者YYYY/MM/DD HH:mm:ss这样的时间格式，而谷歌火狐等浏览器对这样的格式做了扩展，

> iPhone中的safari所支持的格式为 YYYY,MM,DD,HH,mm,ss，

## 解决方式，自己转呗

``` javascript

/**
     * @method startActivity  计算活动开始时间
     * 
     * @param {String} endTime 传入的是一个纯字符串，比如"2017/10/17 00:00:00:00" 或者 "2017-10-17"
     * 
     * @return {Boolean} true表示活动开始，false表示活动还未开始
 * 
   */
        var getStartActivity = function (endTime) {
            var nowTimestamp = Date.now();
            console.log(endTime);
            var endTimestamp = (function (endTime) {
                if (!(/:/.test(endTime))) {
                    // debugger;
                    // console.log(endTime);
                    endTime += " 00:00:00:00";
                    console.log(endTime);
                    var arr = endTime.split(/[- : \/]/),
                    endTime = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
                }
                return endTime.getTime();
            })(endTime);
            if (nowTimestamp < endTimestamp) {
                return false;
            }
            return true;
        }

```