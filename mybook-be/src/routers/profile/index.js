// User 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../db/helper')
const config = require('../../project.config')
const { verify,getToken } = require('../../db/token')
// User
const User = mongoose.model('User')

const router = new Router({
  prefix: '/profile'
})

/**
 * 修改用户密码
 */
router.post('/update/password',async ctx => {
  const { password,oldPassword } = getBody(ctx)
  const {id} = await verify(getToken(ctx))
  const user = await User.findOne({_id:id}).exec()

  if ( !user ) {
    ctx.body = {
      code: 0,
      msg: '用户不存在'
    }
    return
  }

  if ( user.password !== oldPassword ) {
    ctx.body = {
      code: 1,
      msg: '密码校验失败'
    }
    return
  }
  user.password = password
  await user.save()
  ctx.body = {
    code: 1,
    msg: '密码修改成功'
  }
})


module.exports = router
