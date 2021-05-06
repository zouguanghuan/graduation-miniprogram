let baseUrl = "http://localhost:9999"

async function http(option) {
  let {
    url,
    method = "GET",
    data
  } = option;
  let token = {};
  try {
     token = await wx.getStorage({
      key: 'token',
    })
  }catch {
    token = {
      data: ''
    }
  }
  
  // console.log('这是token', token.data)
  return new Promise((res, rej)=>{
    wx.request({
      url: baseUrl+url,
      method,
      data,
      header: {
        'authorization': `Bearer ` + token.data
      },
      success(data){
        // console.log(data.data)
        errorByCode(data.data)
        res(data.data)
      },
      fail(error){
        console.log(error)
        rej(error)
      }
    })
  })
}

function errorByCode(data) {
  if(data.code === 401) {
    wx.showToast({
      title: data.message,
      icon: 'error',
      duration: 2000
    })
    let timer = setTimeout(()=>{
      wx.redirectTo({
        url: '/pages/login/login',
      })
      timer = null
    },2000)
  }else if(data.code === 404) {
    wx.showToast({
      title: 'Not Found',
      icon: 'error',
      duration: 2000
    })
  }
}

export default http