/**
 * 课程数据操作
 */
const { Profession, Class } = require('../model')
const { getLookUp } = require('../util/common/lookup')

// 获取专业列表
exports.getPfList = async (req, res, next) => {
  
}

// 获取班级列表
exports.getClassList = async (req, res, next) => {
  try {
    // 1. 从query中获取筛查数据
    const { profession, class_id } = req.query
    let list = []  // 保存数据
    // 2. 根据条件从表中筛查
    const data  = await getLookUp(Profession, {
      from: "class_list",
      localField: "list",
      foreignField: "id",
      as: "list",
      re: { name: profession },
      project: { list: 1}
    })
    
    if(data.length) {
      list = data[0].list
    }
    // 发送数据
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}
 


