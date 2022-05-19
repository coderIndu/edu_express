const express = require('express')
const CTRL = require('../../controller/count')
const auth = require('../../middleware/auth')

const router = express.Router()

// 获取数据
router.get('/count/getlist', auth, CTRL.getInfo)



module.exports = router