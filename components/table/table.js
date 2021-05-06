import {
  directionMap,
  backColorMap
} from '../../utils/util'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    direction: {
      type: String,
      value: 'top'
    },
    title: {
      type: String,
      value: ''
    },
    status: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    direction: '0deg',
    backColor: '#fff'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached: function () {
    this.setData({
      direction: directionMap[this.properties.direction],
      backColor: backColorMap[this.properties.status],
      titleColor: this.properties.status !== 1 ? '#fff' : '#0a0a0a'
    })
  },
  observers: {
    'status': function (status) {
      this.setData({
        backColor: backColorMap[status],
        titleColor: this.properties.status !== 1 ? '#fff' : '#0a0a0a'
      })
    }
  }
})