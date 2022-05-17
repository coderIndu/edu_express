/**
 * 课程数据操作
 */
const { Notice } = require('../model')

// 新增公告
exports.addOne = async (req, res, next) => {
  try {
    // 1. 从body中获取数据
    const data = req.body

    // 2. 添加文档至数据库
    const result = await Notice.create(data)

    // 3. 发送消息
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

// 删除一则公告
exports.delOne = async (req, res, next) => {
  try {
    // 1. 获取公告id
    const { id: _id } = req.query
    
    // 2. 数据删除
    const result = await Notice.deleteOne({_id})
    console.log(result);
    // 3. 发送数据
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

// 编辑一则公告
exports.editOne = async (req, res, next) => {
  try {
    // 1. 获取id
    const { id, update } = req.body

    // 2. 更新数据
    const result = await Notice.updateOne({id}, update)

    // 3. 发送
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

// 获取公告列表(通过班级id或者创建人id获取)
exports.getlist = async (req, res, next) => {
  try {
    // 1. 从query中获取参数
    const { class_name, userid } = req.query
    // 2. 获取自己发布的或者是自己班级的公告
    const result = await Notice.find({$or: [{class_name}, {create_id: userid}]})
    // 3. 发送数据
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}



