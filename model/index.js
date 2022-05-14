// 数据库操作
const mongoose = require('mongoose')
const { dbUrl } = require('../config/config.default')

mongoose.connect(dbUrl, {
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
  User: mongoose.model('User', require('./module/user')),
  // 权限菜单
  UserMenu: mongoose.model('UserMenu', require('./module/userMenu')),
  // 文件管理
  File: mongoose.model('File', require('./module/file')),
  // 课程列表
  Course: mongoose.model('course_list', require('./module/course_list'), 'course_list'),
  // 专业列表
  Profession: mongoose.model('pf_list', {}, 'pf_list'),
  // 班级列表
  Class: mongoose.model('class_list', require('./module/class_list'), 'class_list'),
  // 聊天室消息
  Socket: mongoose.model('socket_list',require('./module/socket_list'), 'socket_list'),
  // 公告列表
  Notice: mongoose.model('notice_list',require('./module/notice_list'), 'notice_list')
}