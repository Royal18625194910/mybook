// auth 路由管理
const Router = require('@koa/router')
const mongoose = require('mongoose')
// BookClassify
const BookClassify = mongoose.model('BookClassify')

const router = new Router({
  prefix: '/book-classify'
})

// 查询书籍分类列表
router.get('/list', async ctx => {
  const res = await BookClassify.find().sort({_id:-1}).exec()

  ctx.body = {
    code: 1,
    msg: '获取书籍分类成功',
    data: res
  }
})

// 添加分类
router.post('/add', async ctx => {
  const { title } = ctx.request.body
  const one = await BookClassify.findOne({ title}).exec()
// 已经有分类则提示
  if ( one ) {
    ctx.body = { 
      code: 0,
      msg: '书籍分类已经存在'
    }
    return
  }
  // 若无就创建书籍分类
  const bookClassify = new BookClassify({
    title
  })
  const res = await bookClassify.save()
  ctx.body = {
    code: 1,
    msg: '添加书籍分类成功',
    data: res
  }
})

// 删除分类
router.delete('/:id', async ctx => {
  const { id } = ctx.request.params
  const res = await BookClassify.deleteOne({_id:id}).exec()
  ctx.body = {
    code: 1,
    msg: '删除分类成功',
    data: res
  }

})

// 更新标题
router.post('/update/title', async ctx => {
  const { id,title } = ctx.request.body
  const one = await BookClassify.findOne({_id: id}).exec()
  if ( !one ) {
    ctx.body = {
      code: 0,
      msg: '未找到该书籍分类'
    }
    return
  }
  one.title = title
  const res = await one.save()
  ctx.body = {
    code: 1,
    msg: '修改书籍分类成功',
    data: res
  }
})


module.exports = router