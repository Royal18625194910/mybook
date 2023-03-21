const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// BookClassifySchema 
const BookClassifySchema = new mongoose.Schema({
  title: String,
  meta:getMeta()
})

BookClassifySchema.pre('save',preSave)
// model
mongoose.model('BookClassify', BookClassifySchema)
