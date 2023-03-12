const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// UserSchema 用户Schema
const BookSchema = new mongoose.Schema({
  // 书名
  name: String,
  // 价格
  price: Number,
  // 作者
  author: String,
  // 出版日期
  publishDate: String,
  // 分类 
  classify: String,
  // 库存
  count: Number,
  meta:getMeta()
})

BookSchema.pre('save',preSave)
// model
mongoose.model('Book', BookSchema)
