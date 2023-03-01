const mongoose = require('mongoose')
const { getMeta } = require('../helper.js')

// UserSchema 用户Schema
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  meta:getMeta()
})

// model
mongoose.model('User', UserSchema)