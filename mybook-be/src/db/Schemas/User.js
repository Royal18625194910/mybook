const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// UserSchema 用户Schema
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  character: String,  // 权限
  meta:getMeta()
})

UserSchema.pre('save',preSave)
// model
mongoose.model('User', UserSchema)
