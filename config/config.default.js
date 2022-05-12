/**
 * 默认配置
 */
const HOST = '127.0.0.1'
const PORT = 5000
const UPLOAD_PATH = `${process.cwd()}/../resource`
console.log(UPLOAD_PATH);
const BASE_HOST = `http://${HOST}:${PORT}/api`
module.exports = {
  PORT,
  HOST,
  UPLOAD_PATH,
  BASE_HOST,
  // dbUrl: 'mongodb://admin:123321%40@localhost/realworld?authSource=admin',  //本地
  dbUrl: 'mongodb://admin:ggcfcmd233@114.132.229.173:2701/realworld?authSource=admin',     // 腾讯云
  jwtSecret: 'db354649-4ed8-419e-965e-e6b1fd43f243',
  fileBaseUrl: `${BASE_HOST}/${UPLOAD_PATH}`     // 当前地址
}