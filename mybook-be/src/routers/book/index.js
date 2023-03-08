const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../db/helper.js')

const BOOK_CONST = {
  IN:1,
  OUT:2
}

const Book = mongoose.model('Book')

const router = new Router({
  prefix: '/book'
})

// 添加书籍路由
router.post('/add', async ctx => {
  const { name,price,author,publishDate,classify,count } = getBody(ctx)
  const book = new Book({
    name,price,author,publishDate,classify,count
  })

  const res = await book.save()
  ctx.body = {
    code: 1,
    data: res,
    msg: '书籍添加成功'
  }
})

// 查询书籍
router.get('/list', async ctx => {
  // 获取查询参数
  let { page , size,keyword = '' } = ctx.query
  page = Number(page)
  size = Number(size)
  const query = {}
  // 判断
  if ( keyword ) {
    query.name = keyword
  }
  // 执行查询语句
  const list = await Book
  .find(query)
  .skip((page - 1) * size)
  .limit(size)
  .exec()
  // 总数
  const total = await Book.countDocuments()
  ctx.body = {
    code: 1,
    data: {
        total,
        list,
        page,
        size
    },
    msg: '获取书籍列表成功'
  }
})

// 删除某个书籍
router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const delMsg = await Book.deleteOne({_id:id})
  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: delMsg,
  }
})

// 更新库存
router.post('/update/count', async ctx => {
  let { id, num , type } = getBody(ctx);
  num = Number(num)
  const book = await Book.findOne({_id: id}).exec()
  // 若没有相关书籍
  if ( !book ) {
    ctx.body = {
      code: 0,
      msg: '没有找到相关书籍'
    }
    return
  }
  // 是入库还是出库
  num = (type === BOOK_CONST.IN )? Math.abs(num) : -Math.abs(num)
  book.count += num
  // 判断剩余量
  if ( book.count < 0 ) {
    ctx.body = {
      code: 0,
      msg: '剩余量不足'
    }
    return
  }
  const res = await book.save()
  ctx.body = {
    data: res,
    code: 1,
    msg: '操作成功'
  }

})

// 更新书籍信息
router.post('/update', async ctx => {
  const { id, ...others } = getBody(ctx)
  const one = await Book.findOne({_id:id}).exec()
  // 若无书籍
  if (!one ) {
    ctx.body = {
      code: 0,
      data:null,
      msg: '没有找到书籍'
    }
    return
  }
  // 若有书籍
  const newQuery = {}
  Object.entries(others).forEach(([key,value])=>{
    if ( value ) {
      newQuery[key] = value
    }
  })
  Object.assign(one, newQuery)
  const res = await one.save()
  if ( res ) {
    ctx.body = {
      code: 1,
      data: res,
      msg: '保存成功'
    }
  }
})

module.exports = router


