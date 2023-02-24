const mongoose = require('mongoose')

// UserSchema
const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number
})

const UserModel = mongoose.model('User', UserSchema)

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/mybook-data')
  mongoose.connection.on('open', () =>{
    console.log('链接成功');
    const user = new UserModel({
      nickname: 'John',
      password: '123',
      age: 18
    })
    user.save()
  })
}

connect()