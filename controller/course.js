/**
 * 课程数据操作
 */
 const { Course, File, Socket } = require('../model')


 // 课程保存
 exports.add = async (req, res, next) => {
   try {
    // 1. 获取body数据
    let { body } = req

    // 2. 创建新的文档放入集合中
    const result = await Course.create(body)
    
    // 3. 发送数据
    res.status(200).json({data: result})
   } catch (err) {
     next(err)
   }
 }
 
 // 获取课程详情
 exports.getDetails = async (req, res, next) => {
    try {
      // 1. 获取id
      const { id } = req.query
      // 2. 获取课程关联的文件和聊天室内容
      const file_result = await File.find({course_id: id})
      const socket_result = await Socket.find({course_id: id})
      const { card_list } = await Course.findOne({id})

      // 3. 返回信息
      res.status(200).json({file_list: file_result, socket_result: socket_result})
    } catch (error) {
      next(error)
    }
 }

 // 文件列表
 exports.list = async (req, res, next) => {
   try {
    let list = []   
    // 1. 根据class_id / create_id获取文件列表, page: 第几页，limit：每页展示的个数
    let { class_id, create_id, page, limit } = req.body
    
    // 2. 去数据库查询数据
    list = await Course.find({$or: [{create_id},{class_id}]}).limit(limit).skip((page - 1) * limit)
    const total = await Course.count()
    // 3. 返回数据
     res.status(200).json({list, total, page, limit})
   } catch (err) {
     next(err)
   }
 }
 
 // 删除单个课程
 exports.delete = async(req, res, next) => {
   try {
    // 1. 获取数据
    let {id} = req.query

    // 2. 从数据库删除数据
    let { deletedCount  } = await Course.remove({id})
    let msg = deletedCount ? '删除成功' : '删除失败'

    // 3. 发送数据
    res.status(200).json({deletedCount, msg})
   } catch (err) {
     next(err)
   }
 }

// 删除多个课程
exports.removeMany = async (req, res, next) => {
  try {
    // 1. 从body中获取要删除的id数组
    const { ids } = req.body

    // 2. 数据库中删除多个id
    const result = await Course.deleteMany({id: {$in: ids}})
    
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

// 课程打卡
exports.addClock = async (req, res, next) => {
  try {
    // 1. 从query中获取课程id
    const { course_id, userid } = req.query

    // 2. 插入数据userid至数据库中
    const result = await Course.updateOne({id: course_id}, {$addToSet: {card_list: userid}})

    // 3. 返回数据
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
