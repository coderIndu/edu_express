const mongoose = require('mongoose')

const count = new mongoose.Schema({
  pf_id: {
    type: String,
    required: true,
    unique: true
  },
  list: {
    type: Array,
    required: true,
    default: []
  }
})

module.exports = count