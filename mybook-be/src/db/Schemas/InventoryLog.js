const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// InventoryLogSchema 
const InventoryLogSchema = new mongoose.Schema({
  type: String,
  num: Number,
  user: String,
  meta:getMeta()
})

InventoryLogSchema.pre('save',preSave)
// model
mongoose.model('InventoryLog', InventoryLogSchema)