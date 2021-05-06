import http from '../../utils/http'
import Toast from '../../@vant/weapp/dist/toast/toast'
const app = getApp()
Page({
  data: {
    name: 'zou',
    inputName: '',
    switch_psw: true,
    inputSms: ''
  },
  swtich_p: function() {
    this.setData({
      switch_psw: !this.data.switch_psw
    })
  },
  inputHandle: function(e){
    this.data.inputName = e.detail
  },
  inputSmsHandle: function(e){
    console.log(e.detail)
    this.data.inputSms = e.detail
  },
  sendSms: async function(e){
     let res = await http({
       url: '/sendsms',
       method: 'POST',
       data: {
         phone: this.data.inputName
       }
     })
     Toast(res.message)
     if(res.success) {
     } else {

     }
     console.log(res)
  },
  submit: async function(e){
    let {name,password,sms} = e.detail.value;
    const res = await http({
      url: '/forget',
      method: 'POST',
      data: {
        name,
        password,
        sms
      }
    })
    if(res.success) {
      Toast(res.message)
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      Toast(res.message)
    }
  }
})