const express = require("express")
const Ctrl = require('../../controller/code.js')
const auth = require('../../middleware/auth')
const router = express.Router()


// 获取验证码
router.get('/code/getCode', Ctrl.getcode)

// 发送邮箱验证码
router.post('/code/sendEmail', Ctrl.sendEmail)

module.exports = router