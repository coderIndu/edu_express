/**
 * 路由配置
 */
const express = require('express')

const router = express.Router()

// 用户相关路由
router.use(require('./user'))

// 用户资料相关路由
router.use('/profile', require('./profile'))

// 文件操作
router.use(require('./files'))








module.exports = router


