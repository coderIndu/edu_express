/**
 * 格式化日期 
 * @param {*} date 日期
 * @returns 
 */
 function formatDate() {
  let newDate = new Date()
  let year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let day = newDate.getDate()
  let hour = formatZero(newDate.getHours())
  let min = formatZero(newDate.getMinutes())
  let s = formatZero(newDate.getSeconds())
  return `${year}-${month}-${day} ${hour}:${min}:${s}`
}

function formatZero(count) {
  return ("00" + count).slice(-2)
}

module.exports = {
  createDate: {
    type: Date,
    default: formatDate
  },
  updateDate: {
    type: Date,
    default: formatDate
  },
}