const mongoose = require('mongoose')
require('./Schemas/Log')  // LogSchema创建的model
require('./Schemas/User.js')  // UserSchema创建的model
require('./Schemas/InviteCode.js')  // InviteCodeSchema创建的model
require('./Schemas/Book.js')  // BookSchema创建的model
require('./Schemas/InventoryLog.js')  // InventoryLogSchema创建的model
require('./Schemas/Character')  // InventoryLogSchema创建的model
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