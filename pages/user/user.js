//user.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    array: [
      {
        text: '待付款',
        image: '/image/pay.png'
      },
      {
        text: '待发货',
        image: '/image/send.png'
      },
      {
        text: '待收货',
        image: '/image/deliver.png'
      },
      {
        text: '已完成',
        image: '/image/check.png'
      }
    ]
  },
  onLoad: function () {
    console.log('onload')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})

