const jwt = require('jsonwebtoken')
const config = require('../project.config')
const koaJwt = require('koa-jwt')

// 获取token
const getToken = (ctx) => {
  let { authorization } = ctx.header
  console.log('ctx.header',ctx.header);
  return authorization.replace('Bearer ','').replace('bearer ','')
}

// 生成token
const verify = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET,(err,payload) => {
        if ( err ) {
          reject(err)
          return
        }
        resolve(payload)
      })
    })
}

// token控制
const middleware = (app) => {
  app.use(koaJwt({
    secret: config.JWT_SECRET
  }).unless({
    path: [
      /^\/auth\/login/,
      /^\/auth\/register/
    ]
  }))
}

// 捕获jwt中间件的异常
const catchTokenError = async (ctx,next) => {
  return next().catch((error) => {
    if ( error.status === 401 ) {
      ctx.status = 401
      ctx.body = {
        code: 0,
        msg: 'token error'
      }
    } else {
      throw error
    }
  })
}

module.exports = {
  verify,
  getToken,
  middleware,
  catchTokenError
}