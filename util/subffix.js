function getSubffix(str) {
  const arr = str.split('.')
  return arr[arr.length - 1]
}

module.exports = getSubffix