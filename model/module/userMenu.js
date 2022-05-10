// user数据库定义
const mongoose = require('mongoose')

const userMenuSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
})

module.exports = userMenuSchema
