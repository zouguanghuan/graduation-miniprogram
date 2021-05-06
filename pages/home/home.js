const app = getApp()
import Toast from '../../@vant/weapp/dist/toast/toast';
import http from '../../utils/http';
Page({
  data: {
    name: '邹欢',
    bannerList: ['../../public/image/east.jpg','../../public/image/swiper1.jpg','../../public/image/swiper2.jpg', '../../public/image/swiper3.jpg'],
    general_btn1: '常用自习室1',
    general_btn2: '常用自习室2',
    setcolor1: "#71a1ea",
    setcolor2: "#71a1ea",
    room_list: [],
    room_one: 0,
    room_two: 0
  },
  toTomorrow: function() {
    wx.navigateTo({
      url: '/pages/tomorrow/tomorrow',
    })
  },
  toSupervise: function() {
    wx.navigateTo({
      url: '/pages/supervise/supervise',
    })
  },
  toRecord: function() {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },
  toBreakRule: function() {
    wx.navigateTo({
      url: '/pages/break-rule/break-rule',
    })
  },
  toBookSeat: function(e) {
    // console.log(e)
    let {room_id} = e.mark
    wx.setStorage({
      data: room_id,
      key: 'room_id',
    })
    wx.navigateTo({
      url: `/pages/book/book?room_id=${room_id}`
    })
  },
  toGen1: function() {
    if(this.data.room_one) {
      wx.navigateTo({
        url: `/pages/book/book?room_id=${this.data.room_one}`,
      })
    }
  },
  toGen2: function() {
    if(this.data.room_two) {
      wx.navigateTo({
        url: `/pages/book/book?room_id=${this.data.room_two}`,
      })
    }
  },
  toSetting: function() {
    wx.navigateTo({
      url: '/pages/set-gen-room/set-gen-room',
    })
  },
  onReady: async function(){
    let hh = await wx.getStorage({
      key: 'user_id',
    })
    let user_id = hh.data
    let res = await http({
      url: '/get_room_list',
      method: 'POST'
    })
    if(res.success){
      this.setData({
        room_list: res.data
      })
    } else {
      Toast(res.message)
    }
    let res2 = await http({
      url: '/get_user_info',
      method: 'POST',
      data: {
        user_id: user_id
      }
    })
    if(res2.success) {
      this.setData({
        room_one: res2.data[0].room_one,
        room_two: res2.data[0].room_two,
      })
    }
    if(res2.data[0].room_one) {
      let res3 = await http ({
        url: '/get_room_info',
        method: 'POST',
        data: {
          room_id: res2.data[0].room_one
        }
      })
      if(res3.success) {
        this.setData({
          general_btn1: res3.data[0].room_name
        })
      }
    }
    if(res2.data[0].room_two) {
      let res4 = await http ({
        url: '/get_room_info',
        method: 'POST',
        data: {
          room_id: res2.data[0].room_two
        }
      })
      if(res4.success) {
        this.setData({
          general_btn2: res4.data[0].room_name
        })
      }
    }
  }
})