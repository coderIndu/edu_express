/**
 * 聚合查询
 * @param {*} model mooogoose对象
 * @param {*} config 配置
 * from: 关联的表
 * localField: model表关联的字段
 * foreignField: model表与查询表的关联字段
 * as: 查询数据的重命名
 * re: $match 筛查规则
 * field: 结果的显示字段
 * @returns 
 */
async function getLookUp(model, config) {
  const {from, localField, foreignField, as, re, field} = config
  const $lookup = dropNull({from, localField, foreignField, as})
  const $match = dropNull(re)
  const $project = dropNull(field)
  const result = await model.aggregate([{$lookup},{$match},{$project}])
  return result
}

/**
 * 去除值为空的对象
 * @param {Object} obj 
 * @returns 
 */
function dropNull(obj) {
  if(!(obj instanceof Object)) return
  let newObj = obj
  Object.keys(newObj).forEach(key => {
    if(!newObj[key]) delete newObj[key]
  })

  return obj
}



module.exports = {
  getLookUp
}