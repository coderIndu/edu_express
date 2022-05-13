const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandle = require('./middleware/error-handler')
const config = require('./config/config.default')
const {socket} = require('./util/socket/index')

require('./model/index')

const app = express()
const PORT = process.env.PORT || config.PORT

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


// 配置文件目录
app.use(`/api/resource`, express.static(config.UPLOAD_PATH))
// 配置路由
app.use('/api', router)
app.use(errorHandle())

// 配置监听端口
const server = app.listen(PORT, () => {
  console.log("服务端启动端口：" + PORT)
})

// 配置socket
// console.log(socket)
socket(server)