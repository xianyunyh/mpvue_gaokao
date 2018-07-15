import request from './request'
const apiHost = 'https://yehe.flyings.cn/'
const api = {
  getTop: (r) => request.get(apiHost + '/school/index'),
  getSchoolInfo: (id) => request.get(apiHost + 'school/' + id),
  getSpecialty: (id) => request.get(apiHost + 'school/specialty/' + id),
  searchSchool: (data) => request.get(apiHost + 'school/search', data),
  searchScore: (data) => request.get(apiHost + 'score/search', data)
}
export default api
