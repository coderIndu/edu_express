const express = require('express')
const auth = require('../../middleware/auth')
const pfClassCtrl = require('../../controller/pf_class')
const router = express.Router()


// 获取班级列表
router.get('/class/getlist', auth, pfClassCtrl.getClassList)

module.exports = router