Component({
  /**
   * 组件的属性列表
   */
  properties: {
    seatList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedIndex: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goback: function() {
      wx.navigateBack()
    },
    selected: async function(e) {
      let {index, seatInfo } = e.mark;
      // console.log(seatInfo)
      let result = await wx.getStorage({
        key: 'user_status',
      })
      let user_status = result.data
      if(user_status !=1 ) {
        return
      } 
      if(seatInfo.status !== 1) {
        return
      }
      // console.log(e)
      let str = `seatList[${index}].status`
      if(this.data.selectedIndex !== null) {
        let str = `seatList[${this.data.selectedIndex}].status`
        this.setData({
          [str]: 1
        })
      }
      this.setData({
        [str] : 2,
        selectedIndex: index
      })
      this.triggerEvent('myevent',{seatNo:seatInfo.seat_no, seatId: seatInfo.seat_id});
    }
  }
})