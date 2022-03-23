const crypto = require('crypto')

// console.log(crypto.createHash())
module.exports = str => {
  return crypto.createHash('md5')
    .update(`du${str}`)
    .digest('hex')
}