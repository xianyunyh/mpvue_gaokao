import wx from './wx'
import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
  const options = {
    title: '正在加载中',
    mask: true
  }
  wx.showLoading(options)
  return request
})

request.interceptors.response.use(
    (response, promise) => {
      wx.hideLoading()
      return promise.resolve(response.data)
    },
    (err, promise) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
      return promise.resolve()
    }
)

export default request
