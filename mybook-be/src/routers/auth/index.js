// auth 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')

const User = mongoose.model('User')


const router = new Router({
  prefix: '/auth'
})

// 注册路由
router.post('/register', async ctx => {
  const { account,password } = ctx.request.body
  const one = await User.findOne({account}).exec()
  // 若存在该用户则return
  if ( one ) {
    ctx.body = {
      code: 0,
      msg: '已存在该用户',
      data: null
    }
    return 
  }
  // 不存在该用户则注册成功
  const user = new User({
    account,
    password
  })
  const res = await user.save()
  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }
})

// 登录路由
router.post('/login', async ctx => {
  ctx.body = 'login'
})

module.exports = router