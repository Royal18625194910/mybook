// ForgetPassword 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
const {getBody} = require('../../db/helper')
const config = require('../../project.config')
// ForgetPassword
const ForgetPassword = mongoose.model('ForgetPassword')
const User = mongoose.model('User')

const router = new Router({
  prefix: '/forget-password'
})

// 获取忘记密码列表
router.get('/list', async ctx => {
    let { page, size } = ctx.request.query
    page = Number(page)
    size = Number(size)
    const list = await ForgetPassword.find({status:1}).skip( ( page - 1) * size ).limit(size).exec()
    const total = await ForgetPassword.find({status:1}).countDocuments().exec()

    ctx.body = {
      code: 1,
      msg: '获取忘记密码列表成功',
      data: {
        list,
        page,
        size,
        total
      }
    }
})

// 添加账户
router.post('/add', async ctx => {
  const { account } = getBody(ctx)
  const user = await User.findOne({account,}).exec()

  if (!user) {
    ctx.body = {
      code: 1,
      msg: '申请成功啦'
    }
    return
  }

  const one = await ForgetPassword.findOne({account,status:1}).exec()

  if ( one ) {
    ctx.body = {
      code: 1,
      msg: '申请成功了'
    }
    return
  }

  const forgetPwd = new ForgetPassword({
    account,
    status: 1,
  })

  await forgetPwd.save()

  ctx.body = {
    code: 1,
    msg: '申请成功了'
  }
})

// 更新忘记密码账户
router.post('/update/status', async ctx => {
  const { id, status } = getBody(ctx)

  const one = await ForgetPassword.findOne({_id:id}).exec()

  if ( !one ) {
    ctx.body = {
      code: 0,
      msg: '未找到'
    }
    return
  }
  
  one.status = status

  // 若为重置密码，则需重置
  if ( status === 2 ) {
    const user = await User.findOne({account: one.account}).exec()
    if ( user ) {
      user.password = config.DEFAULT_PASSWORD
      await user.save()
    }
  }

  await one.save()
  ctx.body = {
    code: 1,
    msg: '处理成功'
  }
})



module.exports = router