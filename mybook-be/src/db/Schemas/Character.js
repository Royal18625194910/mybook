const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// CharacterSchema 用户Schema
const CharacterSchema = new mongoose.Schema({
  name: String,   // member  admin
  title: String,   // 成员   管理员
  power: Object,
  meta:getMeta()
})

CharacterSchema.pre('save',preSave)
// model
mongoose.model('Character', CharacterSchema)
