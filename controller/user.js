// user 控制器
const { User, Class, Profession } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')


// 用户登录
exports.login = async (req, res, next) => {
  try {
    // 1. 数据验证
    // 2. 生成token
    // console.log(req.user);
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
    const user = req.body.user
    
    // 2. 从班级表中获取对应的班级id数据
    const class_result = await Class.findOne({name: user.className})
    const pf_result = await Profession.findOne({name: user.profession})
    const { id: class_id } = class_result.toObject()
    const { id: pf_id } =  pf_result.toObject()
    // 3. 获取成功，将数据保存到user中
    user.class_id = class_id      // 班级id
    user.pf_id = pf_id            // 专业id
    // console.log(user);
    // 4. 将user对象保存到数据库中
    const data = await User.create(user)
    // 5. 发送成功响应
    res.status(201).json({data})
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
    // 1. 处理请求
    const { userid, profession, className } = req.body
    console.log(className);
    // 1.1 匹配班级id和专业id
    const {id: pf_id} = (await Profession.findOne({name: profession})).toObject()
    const {id: class_id} = (await Class.findOne({name: className})).toObject()

    // 2. 更新用户数据
    const result = await User.updateOne({userid}, {...req.body, pf_id, class_id})

    // 3. 发送数据
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}