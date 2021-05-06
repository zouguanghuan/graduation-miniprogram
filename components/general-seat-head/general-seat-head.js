Component({
  /**
   * 组件的属性列表
   */
  // properties: {
  //   type: String,
  //   back: Boolean,
  //   title: String
  // },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    back: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goback: function() {
      wx.navigateBack()
    }
  },
  attached: function() {
  }
})