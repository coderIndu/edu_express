// user数据库定义
const mongoose = require('mongoose')


const class_list = new mongoose.Schema({
  id: String,
  name: String
})

module.exports = class_list
