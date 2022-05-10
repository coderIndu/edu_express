const { body, py} = require('express-validator')
const validate = require('../middleware/validate')
const { File } = require('../model')

// 注册规则
exports.save = validate([ // 1. 配置验证规则
  body('class_id').notEmpty().withMessage("class_id is required"),
  body('create_id').notEmpty().withMessage("create_id is required"),
])

// 登录规则
// exports.login = [
//   validate([
//     body('user.userid').notEmpty().withMessage("学号不能为空"),
//     body('user.password').notEmpty().withMessage("密码不能为空")
//   ]),
//   validate([
//     body('user.userid').custom(async (userid, { req }) => {
//       const user = await User.findOne({ userid }).select(['userid', "username", 'password', 'bio', 'image'])

//       if (!user) return Promise.reject("用户不存在")
//       // 存放user信息到req对象中，给后面的中间件使用
//       req.user = user
//     })
//   ]),
//   validate([
//     body('user.password').custom(async (password, { req }) => {

//       if (md5(password) !== req.user.password) {
//         return Promise.reject("密码错误")
//       }

//     })
//   ])
// ]

