// user数据库定义
const mongoose = require('mongoose')
const bashModel = require('./base-model')
const md5 = require('../../util/md5')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value)
    // select: false
  },
  bio: {
    type: String,
    default: null
  },
  email: {
    type: String,
    match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  },
  address: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'student'
  },
  profession: {
    type: String,
    required: true
  },
  className: {    // 班级名
    type: String,
    required: true
  },
  class_id: {     // 班级id
    type: String,
    required: true
  },
  pf_id: {        // 专业id
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  ...bashModel
})

module.exports = userSchema
