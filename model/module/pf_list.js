// user数据库定义
const mongoose = require('mongoose')


const pf_list = new mongoose.Schema({
  id: String,
  name: String,
  list: Array
})

module.exports = pf_list
