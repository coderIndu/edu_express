// user数据库定义
const mongoose = require('mongoose')


const NOTICE_LIST = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    userid: {
      type: String,
      required: true
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
      required: true,
      default: null
    },
    pf_id: {        // 专业id
      type: String,
      required: true,
      default: null
    },
    msg: {
      type: String,
      required: true
    }
})

module.exports = NOTICE_LIST
