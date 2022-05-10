const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandle = require('./middleware/error-handler')
require('./model/index')

const app = express()
const PORT = process.env.PORT || 5000

// 解析请求体
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// 配置日志
app.use(morgan('dev'))
// 配置跨域
app.use(cors())

app.get('/', (req, res) => {
  res.send("get /")
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send("post /")
})

// 配置路由
app.use('/api', router)
app.use(errorHandle())

app.listen(PORT, () => {
  console.log("服务端启动：http://localhost:" + PORT)
})