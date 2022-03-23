// user 控制器
const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')


// 用户登录
exports.login = async (req, res, next) => {
  try {
    // 1. 数据验证
    // 2. 生成token
    const user = req.user.toJSON()
    const token = await jwt.sign({ userid: user.userid }, jwtSecret)
    user.token = token
    // 处理请求
    delete user.password
    res.status(200).json({
      ...user,
    })
  } catch (err) {
    next(err)
  }
}

// 用户注册
exports.register = async (req, res, next) => {
  try {
    // 1. 获取请求体数据
    console.log(req.body)
    // 2. 数据验证
    // 3. 验证成功，将数据保存到数据库
    const user = new User(req.body.user)
    await user.save()
    // 4. 发送成功响应
    res.status(201).json(
      user
    )
  } catch (err) {
    next(err)
  }
}

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    // 处理请求
    res.status(200).json({
      user: req.user
    })
  } catch (err) {
    next(err)
  }
}

// 更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('put /user')
  } catch (err) {
    next(err)
  }
}