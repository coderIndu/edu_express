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
    const result = await UserMenu.findOne({ role: 'all' })
    let menus = []
    if(result) {  
      // console.log(result);
      menus = result.toObject().menus
    }
    // console.log(menus);
    user.menu = menus
    delete user.password
    req.user = user 
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).end({})
  }
}