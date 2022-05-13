
let userList = []
const { Notice } = require('../../model/index')


exports.socket = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: "*"
    }
  })
  // 连接成功
  io.on('connection', client => {
    // 发送连接成功事件
    client.emit('success', )
    
    // 客户端断开连接,发送quit事件
    client.on('disconnect', () => {
      userList = userList.filter(item => item.socket_id !== client.id)
      io.emit('quit', client.id, userList)
    })

    // 监听客户端发送消息
    client.on('message', async (data) => {
      // 找到
     try {
      delete data.menu
      delete data._id
      await Notice.create(data)
      const result = await Notice.find()
      io.emit('resMsg', result)
     } catch (error) {
       console.log(error);
     }
    })

    // 监听进入的人员信息
    client.on('into',async (data) => {
      try {
        // 1. 查询是否有用户，无则添加
        const find = userList.findIndex(item => data.userid === item.userid)
        if(find === -1) {
          const userInfo = {...data, socket_id: client.id}
          userList.push(userInfo)
        }
        // 2. 人员进入之后更新人员列表，发送人员列表消息事件
        io.emit('userlist', userList)
        
        // 3. 从数据库中获取消息列表
        const result = await Notice.find()
        io.emit('resMsg', result)
      } catch (error) {
        console.log(error);
      }
    })

  })
}

