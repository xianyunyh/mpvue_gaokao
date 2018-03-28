import request from './request'

const api = {
  getNewsList: (r) => request.get('https://yehe.flyings.cn/school/index')

}
export default api
