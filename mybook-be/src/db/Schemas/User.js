const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// UserSchema 用户Schema
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  meta:getMeta()
})

UserSchema.pre('save',preSave)
// model
mongoose.model('User', UserSchema)
