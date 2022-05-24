const express = require('express')
const CTRL = require('../../controller/count')
const auth = require('../../middleware/auth')

const router = express.Router()

// 获取数据
router.get('/count/getlist', auth, CTRL.getInfo)

// 获取专业班级数据,用户教师注册时显示
router.get('/count/getPfList', CTRL.getPfList)

// 获取近七天的注册人员数据
router.get('/count/seven', auth, CTRL.getRegisterInfo)

module.exports = router