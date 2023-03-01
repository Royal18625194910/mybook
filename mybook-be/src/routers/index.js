// 所有路由管理
const auth = require('./auth')

module.exports = app => {
  app.use(auth.routes())
}