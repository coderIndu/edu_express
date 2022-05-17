// user数据库定义
const mongoose = require('mongoose')
const base = require('./base-model')

const NOTICE_LIST = new mongoose.Schema({
  create_id: {
    type: String,
    required: true
  },
  pf_id: {
    type: String,
    required: true
  },
  class_name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  notice: {
    type: String,
    required: true
  },
  ...base
})

module.exports = NOTICE_LIST
