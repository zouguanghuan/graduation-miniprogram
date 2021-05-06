// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    name: '东华理工大学',
    playBtn: false,
    bannerList: ['../../public/image/east.jpg','https://static-data.eol.cn/upload/school/201914/1552544885_2149_thumb.jpg','https://static-data.eol.cn/upload/school/201914/1552544885_2843_thumb.jpg']
  },
  changePlayBtn: function changePlayBtn(){
   this.setData({
     playBtn: !this.data.playBtn
   })
   console.log('hehe', this.data.playBtn)
  },
  submit: ()=>{
    console.log('嘿嘿')
    wx.navigateTo({
      url: '/pages/login/login',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  }
})
