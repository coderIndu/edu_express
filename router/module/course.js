const express = require('express')
const auth = require('../../middleware/auth')
const courseCtrl = require('../../controller/course')
const router = express.Router()


// 添加课程
router.post('/course/add', auth, courseCtrl.add)

// 获取课程详情
router.get('/course/getDetails', auth, courseCtrl.getDetails)

// 获取课程列表
router.post('/course/getList', auth, courseCtrl.list)

// 删除单个课程
router.get('/course/delete', auth, courseCtrl.delete)

// 删除多个课程
router.post('/course/dropmany', auth, courseCtrl.removeMany)

// 课程打卡
router.get('/course/addClock', auth, courseCtrl.addClock)

// 打卡列表
router.get('/course/getClockList', auth, courseCtrl.getClockList)

module.exports = router