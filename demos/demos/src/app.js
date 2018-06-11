let  str = `在夜色中我有三次受难：{1},生存,爱情 我有三种幸福：{2},王位,太阳`
reg = /\{[0-9]\}/gi;

arr = str.match(reg);

console.log(arr.length);

substr = ['流浪','诗歌']

arr.map((ele,index) =>{
    console.log(ele)
    str = str.replace(ele,substr[index])

})

console.log(str)