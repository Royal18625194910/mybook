// User 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../db/helper')
const config = require('../../project.config')
const { verify,getToken } = require('../../db/token')
// User
const User = mongoose.model('User')
const Character = mongoose.model('Character')

const router = new Router({
  prefix: '/user'
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
  const { account , password,character } = getBody(ctx)

  const char = await Character.findOne({
    _id: character
  })

  if ( !char ) {
    ctx.body = {
      code: 0,
      msg: '出错啦',
      data: null
    }
    return
  }

  const user = new User({
    account,
    password: password || '123123',
    character
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

/**
 * 更新用户角色
 */
router.post('/update/character', async ctx => {
  const { character,userId } = getBody(ctx)

  // 查找角色Id是否存在
  const char = await Character.findOne({ _id: character}).exec()

  if ( !char ) {
    ctx.body = {
      code: 0,
      msg: '出错啦'
    }
    return
  }

  // 修改对应的用户id
  const user = await User.findOne({ _id: userId}).exec()

  if ( !user ) { 
    ctx.body = {
      code: 0,
      msg: '出错啦'
    }
    return
  }

  user.character = character

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  }

})
/**
 * 获取用户token
 */
router.get('/info',async ctx => {
  const token = getToken(ctx)
  const res = await verify(token) 
  ctx.body = {
    code: 1,
    data:res,
    msg: '获取成功'
  }
})

module.exports = router
