const Mock = require('mockjs')
const fs = require('fs')
const { User} = require('../model/index')

const CS_config = {
  length: 10,
  role: 'student',
  pf_id: 'CS',
  profession: "计算机科学",
  className: /计算机[1-3]班/
}

const teacher_config = {
  length: 5,
  role: 'teacher',
  pf_id: 'SE',
  profession: '软件工程',
  className: /软件[1-4]班/
}

const teacher_CS_config = {
  length: 5,
  role: 'teacher',
  pf_id: 'CS',
  profession: '计算机科学',
  className: /计算机[1-3]班/
}

const createData = (config) => {
  const {length, role, pf_id, profession, className} = config
  let list = `list|${length}`
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    [list]: [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "username": "@cname",
        "userid": /20188\d{3}/,
        "age|21-23":  0,
        "password": "123456",
        "email": "@email",
        "bio": "",
        "image": "",
        "role": role,
        "pf_id": pf_id,
        "profession": profession,
        "className": className,
        "class_id": function() {
          const id = this.className.match(/\d/)[0]
          return this.pf_id + zero(id)
        },
        "phone": /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
        "address": "@city(true)"
    }]
  })
  return data.list
}

// const CS_DATA = createData(CS_config)     // 计算机学生数据
const TEACHER_DATA = createData(teacher_CS_config)   // 教师数据
// console.log(TEACHER_DATA);

User.insertMany(TEACHER_DATA).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})


function zero(count) {
  return ("00" + count).slice(-2)
}