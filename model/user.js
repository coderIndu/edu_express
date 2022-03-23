// user数据库定义
const mongoose = require('mongoose')
const bashModel = require('./base-model')
const md5 = require('../util/md5')

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
    set: value => md5(value),
    select: false
  },
  bio: {
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
  ...bashModel
})

module.exports = userSchema
