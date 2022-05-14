const express = require('express')
const auth = require('../../middleware/auth')
const noticeCtrl = require('../../controller/notice')
const router = express.Router()


// 新增公告
router.post('/notice/addOne', auth, noticeCtrl.addOne)

// 删除公告
router.get('/notice/delOne', auth, noticeCtrl.delOne)

// 获取公告列表
router.get('/notice/getlist', auth, noticeCtrl.getlist)

module.exports = router