var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();




router.get('/',async(ctx,next)=>{

    // ctx.body = '首页'
    
})

router.get('/news/:nid',async(ctx,next)=>{
    console.log()
    ctx.body = '新闻页'
})

app.use(router.routes()).use(router.allowedMethods())


app.listen(3000)