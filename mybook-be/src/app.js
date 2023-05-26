const { connect } = require('./db')
const {koaBody} = require('koa-body')
const cors = require('@koa/cors')
const Koa = require('koa');
const app = new Koa();
const registerRoutes = require('./routers') // 路由使用
const { middleware:koaJwtMiddleWare,catchTokenError } = require('./db/token')
const { logMiddleware } = require('./db/helper')

connect().then(() => {
  app.use(cors())  // 跨域处理
  app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024
    }
  }))
  
  app.use(catchTokenError)  
  koaJwtMiddleWare(app)

  app.use(logMiddleware)
  
  registerRoutes(app)

  app.listen(3000,() => {
    console.log('http://localhost:3000');
  })
}) 












