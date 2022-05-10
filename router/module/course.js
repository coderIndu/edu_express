const express = require('express')
const auth = require('../../middleware/auth')
const courseCtrl = require('../../controller/course')
const router = express.Router()


// 添加课程
router.post('/course/add', auth, courseCtrl.add)

// 获取课程列表
router.post('/course/getList', auth, courseCtrl.list)

// 删除单个课程
router.get('/course/delete', auth, courseCtrl.delete)

// 删除多个课程
router.post('/course/dropmany', auth, courseCtrl.removeMany)

module.exports = router