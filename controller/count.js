// 导入模块
const { Count, Profession, Class } = require('../model/index')
const { getLookUp } = require('../util/common/lookup')

// 获取统计数据
exports.getInfo = async (req, res, next) => {
  try {
    // 1. 从query中获取数据
    const { pf_id } = req.query
    console.log(pf_id);
    // 2. 从数据库中查询数据
    
    const list = await getClasses(pf_id)
    // await Count.updateOne({pf_id}, {$set: {list: list}})
    await Count.findOneAndUpdate({pf_id}, {list}, {upsert: true})
    const result = await Count.findOne({pf_id})
    // 3. 发送数据
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

// 获取专业列表信息
exports.getPfList = async (req, res, next) => {
  try {
    // console.log(2333);
    const result = await getPf_list()
    // console.log(result);
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
// 获取专业
/**
 * 获取专业关联的班级的学生个数
 * @param {String} pf_id 专业id
 * @returns 
 */
function getClasses(pf_id) {
  return new Promise(async resolve => {
    try {
      const find = await getLookUp(Class, {
        from: 'users',
        localField: 'id',
        foreignField: 'class_id',
        as: 'users',
        re: {id: {$regex: pf_id}},
        project: {_id: 0, id: 1, name: 1,count: {"$size": "$users"}}
      })
      resolve(find)
    } catch (error) {
      console.log(error);
    }
  })
}

/**
 * 
 * @returns 专业及班级列表
 */
function getPf_list() {
  return new Promise(async resolve => {
    try {
      const find = await getLookUp(Profession, {
        from: 'class_list',
        localField: 'list',
        foreignField: 'id',
        as: 'children'
      })
      resolve(find)
    } catch (error) {
      console.log(error);
    }
  })
}
