// user 控制器
const { User, Class, Profession } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const md5 = require('../util/md5')

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
    const user = req.body.user
    
    // 2. 从班级表中获取对应的班级id数据
    let class_result = await Class.findOne({name: user.className})
    let { id: class_id } = class_result.toObject()

    if(Array.isArray(user.className)) {
      const re = new RegExp(user.className.join('|'))
      class_result = await Class.find({name: re}, {id: 1, _id:0})
      console.log(11111, class_result);
      class_id = class_result.map(item => item.id)
      console.log(2333, class_id);
    }
    
    const pf_result = await Profession.findOne({name: user.profession})
    
    const { id: pf_id } =  pf_result.toObject()
    // 3. 获取成功，将数据保存到user中
    user.class_id = class_id      // 班级id
    user.pf_id = pf_id            // 专业id
    console.log(user);
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
    const { userid, prePwd, newPwd, email } = req.body
    // 1.1 匹配班级id和专业id
    let result = {}

    if(prePwd && newPwd) {
       // 2.1 更新密码
      const findUser = await User.findOne({userid})
      const findPwd = findUser.password
      
      if(findPwd === md5(prePwd)) {
        result = await User.updateOne({$or: [{userid}]}, {$set: {password: newPwd}})
        console.log(2333, result);
      } else {
        result = {
          msg: "原密码不正确"
        }
      }
    } else if(email && newPwd) {      // 邮箱更改密码
      result = await User.updateOne({email}, {$set: {password: newPwd}})
    } else {
      // console.log(1111, req.body);
       // 2.2 更新用户数据
      delete req.body.menu
      result = await User.updateOne({userid}, req.body) // , pf_id, class_id
    }

    // 3. 发送数据
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

// 获取/搜索用户列表
exports.getlist = async (req, res, next) => {

  try {
    // 1. 从query里获取筛选数据
    const { pf_id, role, page, limit, search } = req.query
    // console.log(pf_id, role);
    // 2. 查下相关学生数据
    let list = {}
    let total = await User.find({$and: [{pf_id},{role}]}).count()

    if(pf_id && role) {   // 查找专业的学生
      list = await User.find({$and: [{pf_id},{role}]}).limit(limit).skip((page - 1) * limit)
    } else {    // 查找教师列表
      list = await User.find({$or: [{role}]}).limit(limit).skip((page - 1) * limit)
      total = await User.find({$or: [{role}]}).count()
    }
    
    console.log(1111, total);
    if(search) {
      // 获取list
      list = await User.find({
        role,
        $or: [{userid: { $regex: search }}, {username: {$regex: search}},{className:{$regex: search}}, {profession: {$regex: search}}]
      }).limit(limit).skip((page - 1) * limit)  
      // 获取total
      total = await User.find({
        role,
        $or: [{userid: { $regex: search }}, {username: {$regex: search}},{className:{$regex: search}}, {profession: {$regex: search}}]
      }).count()
      // console.log(1111, total.length);
    }
    // console.log(list);
    // 3. 返回数据
    res.status(200).json({list, total, page, limit})
  } catch (error) {
    next(error)
  }
}

// 删除用户
exports.delUser = async (req, res, next) => {
  try {
    // 1. 获取要删除的用户id

    // 2. 删除数据
    const result = await User.deleteMany({userid: {$in: req.body}})

    // 3. 发送数据
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

// 更改密码
exports.updatePwd = async (req, res, next) => {
  try {
    // 1. 获取密码
    const { prePwd, newPwd, email } = req.body

    // 2. 验证密码
    const result = await User.findOneAndUpdate({$or: [{password: prePwd}, {email}]}, {password: newPwd})
    console.log(1111, result);
  } catch (error) {
    next(error)
  }
}

