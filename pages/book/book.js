import http from '../../utils/http'
import {formatTime} from '../../utils/util'
import Toast from '../../@vant/weapp/dist/toast/toast'
const app = getApp();

Page({
  data: {
    headTip: '请选择',
    seatId: null,
    room_id: 0,
    seatList: [],
    currentSeatId: '',
    user_status: 1,
    btn_text: '确定'
  },
  setSelectedIndex: async function(e) {
    // console.log(e.detail)
    let res = await wx.getStorage({
      key: 'user_status',
    })
    let user_status = res.data
    console.log(user_status)
    if(user_status == 1) {
      this.setData({
        headTip: e.detail.seatNo+'号座位',
        seatId: e.detail.seatId
      })
    }
  },
  submit: async function() {
    let {room_id} = this.options
    let {seatId} = this.data
    let result = await wx.getStorage({
      key: 'user_id',
    })
    let user_id = result.data
    let d = new Date();
    let date = formatTime(d)
    let res  = await http({
      url:'/book_seat',
      method: 'POST',
      data: {
        seat_id: seatId,
        user_id: user_id,
        room_id,
        date
      }
    })
    if(res.success) {
      wx.setStorage({
        data: 2,
        key: 'user_status',
      })
      Toast("成功预约")
      wx.navigateTo({
        url: '/pages/home/home',
      })
    }
  },
  cancel: async function() {
    let room_id = this.options
    let result = await wx.getStorage({
      key: 'user_id',
    })
    let user_id = result.data
    let res = await http({
      url: '/cancel_seat',
      method: 'POST',
      data: {
        user_id: user_id,
        seat_id: this.data.currentSeatId,
        room_id
      }
    })
    if(res.success) {
      Toast('取消成功')
      wx.setStorage({
        data: 1,
        key: 'user_status',
      })
      wx.navigateTo({
        url: '/pages/home/home',
      })
    }
  },
  judge: async function() {
    let {user_status} = this.data
    if(user_status === 1) {
      this.submit()
    } else if(user_status === 2) {
      this.cancel()
    } else {
      wx.showToast({
        title: '您违规了',
      })
    }
  },
  onReady: async function() {
    let result = await wx.getStorage({
      key: 'user_id',
    })
    let result2 = await wx.getStorage({
      key: 'user_status',
    })
    if(result2.data === 1 ) {
      this.setData({
        btn_text: '确定'
      })
    } else if(result2.data===2) {
      this.setData({
        btn_text: '取消'
      })
    } else {
      this.setData({
        btn_text: '违规了'
      })
    }
    let user_id = result.data
    let {room_id} = this.options
    this.setData({
      room_id: room_id,
      user_status: result2.data
    })
    let res = await http({
      url: '/get_seat_list',
      method: 'POST',
      data: {
        room_id: room_id
      }
    })
    this.setData({
      seatList: res.data
    })
    let res2 = await http({
      url: '/get_user_seat_relation',
      method: 'POST',
      data: {
        user_id
      }
    })
    if(res2.success) {
      this.setData({
        currentSeatId: res2.data[0].seat_id,
        headTip: '已经选择了'+res2.data[0].seat_no+'号座位'
      })
    }
  }
})