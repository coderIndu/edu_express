const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User, UserMenu } = require('../model')
// 验证token
module.exports = async (req, res, next) => {
  let token = req.headers['authorization']

  token = token ? token.replace('Bearer ', "") : null

  
  if (!token) {
    return res.status(401).end("token验证失败")
  }

  try {
    const { userid } = await verify(token, jwtSecret)
    const user = (await User.findOne({ userid })).toJSON()
    const { menus = "" } = (await UserMenu.findOne({ role: user.role })).toJSON()

    user.menu = menus
    delete user.password
    req.user = user 
    next()
  } catch (error) {
    return res.status(401).end({})
  }
}