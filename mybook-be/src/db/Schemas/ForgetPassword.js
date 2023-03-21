const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// ForgetPasswordSchema 忘记密码Schema
const ForgetPasswordSchema = new mongoose.Schema({
  account: String,
  // 1 待处理  2 已重置  3 已忽略
  status: Number,
  meta:getMeta()
})

ForgetPasswordSchema.pre('save',preSave)
// model
mongoose.model('ForgetPassword', ForgetPasswordSchema)
