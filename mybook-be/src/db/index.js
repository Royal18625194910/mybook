const mongoose = require('mongoose')
require('./Schemas/User.js')  // UserSchema创建的model
const connect = () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://localhost:27017/mybook-data')
    mongoose.connection.on('open', () =>{
      console.log('链接成功');
      resolve()
    })
  })
}

module.exports = { connect }