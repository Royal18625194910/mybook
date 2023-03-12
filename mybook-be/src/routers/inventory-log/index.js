// auth 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
// InviteCode
const InventoryLog = mongoose.model('InventoryLog')

const router = new Router({
  prefix: '/inventory-log'
})

/**
 * 获取日志数据列表
 */
router.get('/list', async ctx => {
  let { type ,page , size } = ctx.query
  type = Number(type)
  page = Number(page)
  size = Number(size)

  // 获取指定入库出库的日志数据
  const list = await InventoryLog.find({
    type,
  })
  .sort({
    _id: -1
  })
  .skip((page - 1) * size)
  .limit(size)
  .exec()

  // 获取日志总数据
  const total = await InventoryLog.find({type}).countDocuments().exec()
  ctx.body = {
    code: 1,
    msg:'获取日志数据成功',
    data:{
      total,
      list,
      page,
      size
    }
  }
})

module.exports = router