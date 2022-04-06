// 1
{
  "_id": ObjectId("621c9d60642d00001a006835"),
  "role": "student",
  "menus": [,
    {
      "icon": "Menu",
      "name": "课程安排",
      "type": 1,
      "children": [{
          "name": "今日课表",
          "type": 2,
          "url": "/main/class/todayClass"
        },
        {
          "name": "课程计划",
          "type": 2,
          "url": "/main/class/classPlan"
        },
        {
          "name": "发布课程",
          "type": 2,
          "url": "/main/user/createCourse"
        }
      ]
    },
    {
      "icon": "Calendar",
      "name": "学习记录",
      "type": 1,
      "children": [{
          "name": "今日打卡",
          "type": 2,
          "url": "/main/studyPlan/signIn"
        },
        {
          "name": "课程笔记",
          "type": 2,
          "url": "/main/studyPlan/classNote"
        }
      ]
    },
    {
      "icon": "Monitor",
      "type": 1,
      "name": "公告安排",
      "children": [{
        "name": "信息公告",
        "type": 2,
        "url": "/main/notice"
      }]
    },
    {
      "icon": "OfficeBuilding",
      "name": "系统概况",
      "type": 1,
      "children": [{
        "name": "注册人数",
        "type": 2,
        "url": "/main/system/enrollment"
      }]
    },
    {
      "icon": "User",
      "name": "个人信息",
      "type": 1,
      "children": [{
          "name": "基本信息",
          "type": 2,
          "url": "/main/user/basic"
        },
        {
          "name": "兴趣爱好",
          "type": 2,
          "url": "/main/user/hobbies"
        }
      ]
    },
  ]
}