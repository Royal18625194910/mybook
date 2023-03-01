const { connect } = require('./db')
const {koaBody} = require('koa-body')
const cors = require('@koa/cors')
const Koa = require('koa');
const app = new Koa();
const registerRoutes = require('./routers') // 路由使用


connect().then(() => {
  app.use(koaBody())
  app.use(cors())  // 跨域处理
  registerRoutes(app)

  app.use(async (ctx) => {
    ctx.body = "hello koa2";
  });
  app.listen(3000,() => {
    console.log('http://localhost:3000');
  })
}) 












