const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const auth = require('../middleware/auth')

const getSubffix = require('../util/subffix')
const router = express.Router()

const filesDir = `${__dirname}/../upload/`  // 上传文件目录
router.post('/upload', auth ,(req, res, next) => {
  console.log(__dirname);
  const form = new formidable.IncomingForm({
    uploadDir: filesDir,
    keepExtensions: true
  });
  
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    files = files[""] 
    let suffixStr = getSubffix(files.originalFilename) // 获取文件名后缀
    res.json({ fields, files});
  });
});

router.get('/download', auth, (req, res, next) => {
  const { path } = req.query
  fs.readdir(filesDir, (err, files) => {
    if(err) {
      next(err)
      return
    }
    const filePath = filesDir + files.filter(item => item === path)
    res.download(filePath)
  })
  
});


module.exports = router