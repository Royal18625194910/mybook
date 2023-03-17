// auth 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../db/helper.js')
const jwt = require('jsonwebtoken')
const config = require('../../project.config')

// UserModel
const User = mongoose.model('User')

const InviteCode = mongoose.model('InviteCode')


const router = new Router({
  prefix: '/auth'
})

// 注册路由
router.post('/register', async ctx => {
  const { account,password,inviteCode } = getBody(ctx)
   // 若未输入，则提示 “未输入用户名或密码”
   if ( !account || !password || !inviteCode) { 
    return ctx.body = {
      code: 0,
      msg: '未输入用户名或密码',
      data: null
    }
  }
   // 查询邀请码
   const findInviteCode = await InviteCode.findOne({code: inviteCode}).exec()
   console.log(findInviteCode);
   // 邀请码不存在
   if ( !findInviteCode || findInviteCode.user ) {
      ctx.body = {
       code: 0,
       msg: '邀请码不正确',
       data: null
     }
     return
   }
  // 进行查询
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
 
  // 不存在该用户则保存并提示注册成功
  const user = new User({
    account,
    password
  })
  const res = await user.save()
  findInviteCode.user = res._id
  findInviteCode.meta.updatedAt = new Date().getTime()
  await findInviteCode.save()
  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }
})

// 登录路由
router.post('/login', async ctx => {
  const { account,password } = getBody(ctx)
  // 若未输入，则提示 “未输入用户名或密码”
  if ( !account || !password ) { 
    return ctx.body = {
      code: 0,
      msg: '未输入用户名或密码',
      data: null
    }
  }
  // 进行查询
  const one = await User.findOne({account}).exec()
  // 若不存在，则用户密码错误
  if ( !one || one.password !== password) {
     ctx.body = {
      code: 0,
      msg: '用户或密码错误',
      data: null
    }
    return
  }

  const user = {account,id:one._id,character: one.character}
  return ctx.body = {
    code: 1,
    msg: '登录成功',
    data: {
      user,
      token: jwt.sign(user,config.JWT_SECRET),
    }
  }
})

module.exports = router