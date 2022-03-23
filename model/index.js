// 数据库操作
const mongoose = require('mongoose')
const { dbUri } = require('../config/config.default')

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

// 当连接失败的时候
db.on('error', err => {
  console.log('MongoDB 连接数据库失败', err)
})

// 当连接成功的时候
db.once('open', function () {
  console.log('MongoDB 数据库连接成功！')
})

// 组织导出模型类
module.exports = {
  // mongoose默认规则：User -> users 集合
  User: mongoose.model('User', require('./user')),
  UserMenu: mongoose.model('UserMenu', require('./userMenu'))
}