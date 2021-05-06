const app = getApp()
import Toast from '../../@vant/weapp/dist/toast/toast'
const citys = {
  西区图书馆: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  东区图书馆: ['福州', '厦门', '莆田', '三明', '泉州'],
};

Page({
  data: {
    columns: [
      {
        values: Object.keys(citys),
        className: 'column1',
      },
      {
        values: citys['浙江'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
  },

  onConfirm(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },

  onCancel() {
    Toast('取消');
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },
});