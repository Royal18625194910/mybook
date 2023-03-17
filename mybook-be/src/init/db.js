const mongoose = require('mongoose')
const { connect } = require('../db/index')
const { defaultCharacters } = require('../db/character')

const Character = mongoose.model('Character')

connect()
.then( async () => {
  console.log('开始初始化角色集合');
  await Character.insertMany(defaultCharacters)
  console.log('完成初始化角色集合');

})