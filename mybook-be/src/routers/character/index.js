// auth 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
// InviteCode
const Character = mongoose.model('Character')

const router = new Router({
  prefix: '/character'
})

// 获取角色列表
router.get('/list', async ctx => {
  console.log('11111111111111111111111');
  const list = await Character.find().exec()

  ctx.body = {
    code: 1,
    msg: '获取角色列表成功',
    data: list
  }
})


module.exports = router