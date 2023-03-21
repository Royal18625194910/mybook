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
router.post('/add', async ctx => {
  const { count = 1 } = ctx.request.body
  const arr = []
  for (let i = 0; i < count; i++) {
    arr.push({
      code: uuidv4(),
      user: ''
    })
  }
  const res = await InviteCode.insertMany(arr)
  ctx.body = {
    code: 1,
    data: res,
    msg: '邀请码创建成功'
  }
})

/**
 * 获取邀请码列表数据
 */
router.get('/list', async ctx => {
  let { page,size } = ctx.request.query
  page = Number(page)
  size = Number(size)

  const list = await InviteCode.find().sort({_id:-1}).skip( ( page - 1 ) * size ).limit(size).exec()

  const total = await InviteCode.countDocuments()

  ctx.body = {
    code: 1,
    msg: '获取邀请码列表成功',
    data: {
      total,
      list,
      page,
      size
    }
  }
})

/**
 * 删除某个邀请码
 */
router.delete('/:id',async ctx => {
  const { id } = ctx.params
  const res = await InviteCode.deleteOne({_id:id}).exec()

  ctx.body = {
    code: 1,
    msg: '删除邀请码成功',
    data: res
  }
})


module.exports = router