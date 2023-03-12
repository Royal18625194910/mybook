// User 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../db/helper')
const config = require('../../project.config')
// InviteCode
const User = mongoose.model('User')

const router = new Router({
  prefix: '/user',
})

/**
 * 获取用户列表数据
 */
router.get('/list', async ctx => {
  // 获取query参数
  let { page,size,keyword } = ctx.query
  page = Number(page)
  size = Number(size)

  const query = {}

  if (keyword) {
    query.account = keyword
  }

  // 获取用户列表
  const list = await User.find(query)
  .sort({
    _id:-1
  })
  .skip((page - 1) * size)
  .limit(size)
  .exec()

  // 获取用户总数
  const total = await User.countDocuments()

  // 返回数据
  ctx.body = {
    code: 1,
    msg: '获取用户列表成功',
    data: {
      list,
      total,
      page,
      size
    }
  }
})

/**
 * 按照id删除某个用户
 */
router.delete('/:id', async ctx => {
  const { id } = ctx.params

  const delMsg = await User.deleteOne({_id:id}).exec()

  ctx.body = {
    code: 1,
    msg: '删除用户成功',
    data: delMsg
  }
})
/**
 * 添加用户
 */
router.post('/add', async ctx => {
  const { account , password } = getBody(ctx)

  const user = new User({
    account,
    password: password || '123123'
  })

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  }
})

/**
 * 重置用户密码
 */
router.post('/reset/password', async ctx => {
  const { id } = getBody(ctx)
  
  const user = await User.findOne({_id: id}).exec()

  if ( !user ) {
    ctx.body = {
      code: 0,
      msg: '该用户不存在',
      data: null
    }
    return
  }

  user.password = config.DEFAULT_PASSWORD
  const res = await user.save()
  ctx.body = {
    code: 1,
    msg: '用户密码重置成功',
    data: {
      account: res.account,
      id: res._id
    }
  }
})

module.exports = router
