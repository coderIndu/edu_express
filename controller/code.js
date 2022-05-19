const svgCaptcha = require('svg-captcha');
const nodemailer = require('nodemailer')

// 图形验证码
exports.getcode = (req, res, next) => {
  try {
    // 1. 创建svg图形验证码
    const captcha = svgCaptcha.create({
      height: 40
    })
    
    // res.type('svg')
    res.status(200).send(captcha)
  } catch (error) {
    next(error)
  }
}

// 邮箱验证码
exports.sendEmail = async (req, res, next) => {
  try {
    // 1. 设置发送邮箱的对象
    const { email } = req.body
    const transport = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: '1791105501@qq.com',
        pass: 'nmutcrzhdztvbcbf'
      }
    })
    
    // 2. 设置发件人
    const code = parseInt( Math.random() * Math.pow(10, 6))
    // console.log(code);
    const mailOption = {
      from: '1791105501@qq.com',
      to: email,
      subject: '邮箱验证',
      text: `您的邮箱验证码是${code}，请注意保存。`
    }

    // 3. 
    const result = await transport.sendMail(mailOption)
    // console.log(result);
    res.status(200).json({...result, code})
  } catch (error) {
    next(error)
  }
}