/**
 * 用户路由配置
 */
const express = require('express')
const userCtrl = require('../../controller/user')
const userValidator = require('../../validator/user')
const auth = require('../../middleware/auth')

const router = express.Router()

// 用户相关路由
// 用户登录
router.post('/users/login', userValidator.login, userCtrl.login)

// 用户注册
router.post('/users/register', userValidator.register, userCtrl.register)

// 获取当前登录用户
router.get('/user', [auth, userValidator.getCurrentUser], userCtrl.getCurrentUser)

// 更新当前登录用户
router.post('/user/update', userCtrl.updateCurrentUser)

// 获取用户列表
router.get('/user/getlist', auth, userCtrl.getlist)

// 删除用户
router.post('/user/delUser', auth, userCtrl.delUser)


module.exports = router


