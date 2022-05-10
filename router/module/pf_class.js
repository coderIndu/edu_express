const express = require('express')
const auth = require('../../middleware/auth')
const pfClassCtrl = require('../../controller/pf_class')
const router = express.Router()


// 添加课程
router.get('/class/getlist', auth, pfClassCtrl.getClassList)

module.exports = router