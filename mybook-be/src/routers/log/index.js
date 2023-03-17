// Log 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../db/helper')
// Log
const Log = mongoose.model('Log')

const router = new Router({
  prefix: '/log'
})

/**
 * 获取用户日志列表  list
 */
router.get('/list',async ctx => {
  let { page, size } = ctx.query
  page = Number(page)
  size = Number(size)
  // 日志列表数据
  const list = await Log.find({show: true}).skip(( page - 1) * size ).limit(size).exec()
  // 总数
  const total = await Log.countDocuments().exec()

  ctx.body = {
    code: 1,
    msg: '获取日志列表成功',
    data: {
      list,
      total,
      page,
      size
    }
  }
})

/**
 * 删除某条日志记录  /log/:id
 */
router.post('/delete',async ctx => {
  const { id } = getBody(ctx)

  const one = await Log.findOne({_id:id}).exec()

  if ( !one ) {
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
    return
  }
  one.show = false
  await one.save()

  ctx.body = {
    code: 1,
    msg: '删除成功',
  }
})

module.exports = router
