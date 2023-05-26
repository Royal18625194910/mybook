const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// UserSchema 用户Schema
const UserSchema = new mongoose.Schema({
  // 用户名
  account: String,
  // 密码
  password: String,
  // 角色
  character: String, 
  // 元信息 
  meta:getMeta()
})

UserSchema.pre('save',preSave)
// model
mongoose.model('User', UserSchema)
