import wx from './wx'
import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
  wx.showLoading()
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
