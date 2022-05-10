
/**
 * 格式化日期
 * @param {*} date 日期
 * @param {*} fmt 格式
 * @returns 
 */
function dateFormat(date, fmt="yyyy-mm-dd hh:MM:ss") {
  let ret;
  const opt = {
      "y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "h+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "s+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

/**
 * 筛选文件信息保存到数据库
 * @param {*} data 文件信息数据
 * @returns 
 */
function getFileInfo(data) {
  let id = data?.newFilename.replace(/\..*/, '')
  let {filepath: path, size, originalFilename:name, lastModifiedDate: createData} = data
  createData = dateFormat(new Date(createData))
  let info = {id, name, path, size, createData}
  return info
}

module.exports = {
  dateFormat,
  getFileInfo
}