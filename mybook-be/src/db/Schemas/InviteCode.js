const mongoose = require('mongoose')
const { getMeta } = require('../helper.js')

// UserSchema 用户Schema
const InviteCodeSchema = new mongoose.Schema({
  // 邀请码
  code: String, 
  // 注册的用户
  user: String,  
  meta:getMeta()
})

// model
mongoose.model('InviteCode', InviteCodeSchema)