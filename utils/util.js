const formatTime = (time) => {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const directionMap = {
  'top' : '0',
  'bottom': '180deg',
  'left': '270deg',
  'right': '90deg',
}
// 0: 损坏，
// 1：空闲
// 2：我的选择
// 3：有人
const backColorMap = {
  0: '#c3c7d3',
  1: '#fff',
  2: '#b4d9fc',
  3: '#dd8383'
}

const userStaus = {
  1: '未预约',
  2: '已预约',
  3: '违规'
}
module.exports = {
  formatTime,
  directionMap,
  backColorMap,
  userStaus,
  formatTime
}
