const { body, query } = require('express-validator')
const validate = require('../middleware/validate')
const { User } = require('../model')
const md5 = require('../util/md5')

// 注册规则
exports.register = validate([ // 1. 配置验证规则
  body('user.username').notEmpty().withMessage("用户名不能为空"),
    // .custom(async username => {
    //   const user = await User.findOne({ username })
    //   if (user) return Promise.reject("用户名已存在")
    // }),

  body('user.password').notEmpty().withMessage("密码不能为空"),

  body('user.userid')
    .notEmpty().withMessage("学号不能为空")
    .bail()
    .custom(async userid => {
      const user = await User.findOne({ userid })
      if (user) return Promise.reject("该学号已注册")
    })
])

// 登录规则
exports.login = [
  validate([
    body('user.userid').notEmpty().withMessage("学号不能为空"),
    body('user.password').notEmpty().withMessage("密码不能为空")
  ]),
  validate([
    body('user.userid').custom(async (userid, { req }) => {
      const user = await User.findOne({ userid })

      if (!user) return Promise.reject("用户不存在")
      // 存放user信息到req对象中，给后面的中间件使用
      req.user = user
    })
  ]),
  validate([
    body('user.password').custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误")
      }
    })
  ])
]

/**
 * 获取用户信息
 */
exports.getCurrentUser = validate([ // 1. 配置验证规则
  query('userid')
    .notEmpty().withMessage("学号不能为空")
    .custom(async (userid, { req }) => {
      if (!userid) return Promise.reject("没有该用户")
    })
])