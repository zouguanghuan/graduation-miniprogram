import http from '../../utils/http'
const app = getApp()

Page({
  data: {
    seatList: [],
    roomList: [],
    bannerList: ['../../public/image/east.jpg','../../public/image/swiper1.jpg','../../public/image/swiper2.jpg', '../../public/image/swiper3.jpg'],
    general_btn1: '常用位置1',
    general_btn2: '常用位置2',
    setcolor1: "#71a1ea",
    setcolor2: "#71a1ea",
    focus: false,
    inputValue: ''
  },

  submit: async function(e) {
    console.log(this.data.inputValue)
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  toBook: function(e) {
    
  }
})