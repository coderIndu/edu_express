const express = require('express')
const auth = require('../../middleware/auth')
const fileCtrl = require('../../controller/file')
const router = express.Router()


// 上传文件
router.post('/file/upload', auth , fileCtrl.save)

// 文件下载链接
router.get('/file/download', auth, fileCtrl.get)

// 文件列表
router.get('/file/getfiles', auth, fileCtrl.list)

// 删除文件
router.post('/file/delete', auth, fileCtrl.delete)
module.exports = router