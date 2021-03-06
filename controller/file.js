/**
 * file控制器
 */
const fs = require('fs')
const { promisify } = require('util')
const { File } = require('../model')
const { dateFormat } = require('../util/index')
const dropFile = promisify(fs.unlink)

// 上传文件
exports.save = async (req, res, next) => {
  try {
    // 1. 设置数据
    const file = req.files[0]    
    req.body.id = file.id
    req.body.size = file.size
    req.body.path = '/resource/' + file.filename
    req.body.mimetype = file.mimetype
    req.body.createDate = dateFormat(new Date(req.body.lastModifiedDate))
    
    // 2. 存放数据
    const result = await File.create(req.body)
    // 3. 返回数据
    res.status(200).json(result)
    // })
  } catch (err) {
    next(err)
  }
}

// 文件获取
exports.get = async (req, res, next) => {
  try {
    // 1. 获取用户发送的fileid
    const { fileid } = req.query
    // 2. 根据fileid去数据库查询对应文档
    const file = await File.findOne({id: fileid}) || {}

    // 3. 发送响应
    res.status(200).json({file})
  } catch (err) {
    next(err)
  }
} 

// 文件列表
exports.list = async (req, res, next) => {
  try {
    // 1. 从query中获取课程id（classid）
    let { class_id, course_id } = req.query
    let fileList = []
    // 2. 从数据库中查询符合条件的数据
    fileList = await File.find({$and: [{class_id}, {course_id}]})
    
    // 3. 返回数据
    res.status(200).json({list: fileList})
  } catch (err) {
    next(err)
  }
}

// 删除文件
exports.delete = async(req, res, next) => {
  try {
    // 1. 从query中获取需要删除的文件id
    let { ids } = req.body
    let msg = null

    // 2. 从数据库中查询此数据
    let findInfo = await File.find({id: {$in: ids}})

    if(findInfo) {
      // 获取删除资源路径
      let paths = findInfo.map(item => item.path)

      // 3. 删除对应数据
      const { deletedCount } = await File.deleteMany({id: { $in: ids }})
      // 删除数据成功
      if(deletedCount) {
        // 4. 服务器对应文件也需要删除
        for (let i = 0; i < paths.length; i++) {
          const path = process.cwd() + '/..' + paths[i]
          await dropFile(path)
        }
        msg = "删除成功"
      }
    }

    // 发送响应
    res.status(200).json({msg})
  } catch (err) {
    next(err)
  }
}

// 更改文件名
exports.rename = async(req, res, next) => {
  try {
    // 1. 获取文件id
    const { id, name } = req.query

    // 2. 更改数据名称
    const result = await File.updateOne({id}, {$set: {name}})

    // 3. 发送响应数据
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
}