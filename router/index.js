/**
 * 路由配置
 */
const express = require('express')

const router = express.Router()

// 用户相关路由
router.use(require('./module/user'))

// 用户资料相关路由
router.use('/profile', require('./module/profile'))

// 文件操作
router.use(require('./module/files'))

// 课程相关
router.use(require('./module/course'))

// 专业班级相关
router.use(require('./module/pf_class'))





module.exports = router


