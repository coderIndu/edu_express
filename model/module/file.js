// user数据库定义
const mongoose = require('mongoose')


const fileSchema = new mongoose.Schema({
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
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
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
  mimetype: {
    type: String,
    required: true
  },
  course_id: {
    type: String,
    required: true
  },
  createData: {
    type: String,
    required: true
  }

})

module.exports = fileSchema
