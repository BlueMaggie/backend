
const Koa = require("koa2");
const fs=require("fs");
const app = new Koa();
const bodyparser = require('koa-bodyparser')
app.use(bodyparser())
const index=require('./routes');
app.use(index.routes(),index.allowedMethods());

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
app.on('error', (err, ctx) => {
    ctx.body=err
    console.error('error', err, ctx)
});
//请求体解析器

// 3.绑定端口号 3000
app.listen(3000);