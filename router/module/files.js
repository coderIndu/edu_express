const express = require('express')
const auth = require('../../middleware/auth')
const fileCtrl = require('../../controller/file')
const router = express.Router()

const config = require('../../config/config.default')
const multer = require ('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    file.id = parseInt(new Date().getTime() * Math.random() * 100)
    cb(null, new Date().getTime() + '_' + file.originalname)
  }
})
const upload = multer({storage, limits: {
  fieldSize: 1024 * 1024 * 1024
}})

// 上传文件
router.post('/file/upload', [auth, upload.any()] , fileCtrl.save)

// 文件下载链接
router.get('/file/download', auth, fileCtrl.get)

// 文件列表
router.get('/file/getfiles', auth, fileCtrl.list)

// 删除文件
router.post('/file/delete', auth, fileCtrl.delete)

// 文件重命名
router.get('/file/rename', auth, fileCtrl.rename)

module.exports = router