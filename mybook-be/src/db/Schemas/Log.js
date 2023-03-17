const mongoose = require('mongoose')
const { getMeta,preSave } = require('../helper.js')

// LogSchema 日志Schema
const LogSchema = new mongoose.Schema({
  user: {
    account: String,
    id: String
  },
  request: {
    method: String,
    url: String,
    responseBody: String,
    status: Number,
  },
  endTime: Number,
  startTime: Number,
  show: Boolean,
  meta: getMeta()
})

LogSchema.pre('save',preSave)
// model
mongoose.model('Log', LogSchema)
