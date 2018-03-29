import request from './request'

const apiHost = 'https://yehe.flyings.cn/'
const api = {
  getTop: (r) => request.get(apiHost + '/school/index'),
  getSchoolInfo: (id) => request.get(apiHost + 'school/' + id)

}
export default api
