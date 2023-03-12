const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// UserSchema 用户Schema
const InviteCodeSchema = new mongoose.Schema({
  // 邀请码
  code: String, 
  // 注册的用户
  user: String,  
  meta:getMeta()
})

InviteCodeSchema.pre('save',preSave)
// model
mongoose.model('InviteCode', InviteCodeSchema)