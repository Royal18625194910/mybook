// auth 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
// InviteCode
const InviteCode = mongoose.model('InviteCode')


const router = new Router({
  prefix: '/invite'
})

/**
 * 添加邀请码路由
 */
router.get('/add', async ctx => {
  const invite = new InviteCode({
    code: uuidv4(),
    user: ''
  })
  const saved = await invite.save()
  ctx.body = {
    code: 1,
    data: saved,
    msg: '邀请码创建成功'
  }
})


module.exports = router