// user数据库定义
const mongoose = require('mongoose')
const base_model = require('./base-model')

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,  // 是否必传
    unique: true     // 唯一值
  },
  name: {
    type: String,
    required: true,
    default: null  // 默认值
  },
  card_list: {      // 该课程打开的学生列表
    type: Array,
    default: []
  },
  class_name: {
    type: String,
    required: true
  },
  class_id: {
    type: String,
    required: true
  },
  create_id: {
    type: String,
    required: true
  },
  create_name: {
    type: String,
    required: true
  },
  ...base_model
})

module.exports = courseSchema
