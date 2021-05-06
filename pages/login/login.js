import http from '../../utils/http'
import Toast from '../../@vant/weapp/dist/toast/toast'
const app = getApp()

Page({
  data: {
    name: '邹广欢',
    // url_bg: 'http://wx4.sinaimg.cn/mw1024/ce78fa4cly1g4oaomvpyhj20kf0umk0q.jpg',
    url_bg: '../../public/image/bgimage.jpeg',
    switch_psw: true,
  },
  swtich_p: function() {
    this.setData({
      switch_psw: !this.data.switch_psw
    })
  },
   submit: async function(e){
    let name = e.detail.value.username;
    let password = e.detail.value.password;

    let res =  await http({url: '/login', method: 'POST', data: {name, password}})
    if(res.success) {
      Toast(res.message),
      wx.setStorage({
        data: res.token, 
        key: 'token',
      })
      wx.setStorage({
        data: res.data[0].user_id,
        key: 'user_id'
      })
      wx.setStorage({
        data: res.data[0].status,
        key: 'user_status'
      })
      wx.navigateTo({
        url: '../home/home'
      })
    } else {
      Toast(res.message)
    }
    
  },
  forgetPassword: function(){
    wx.navigateTo({
      url: '../forget/forget',
    })
  }
})