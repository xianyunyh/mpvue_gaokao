import Vue from 'vue'
import App from './App'
import '../static/weui.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)

app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs',
      '^pages/index',
      'pages/school/list',
      'pages/school/detail',
      'pages/search/school'
    ],
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#099ff5',
      backgroundColorTop: '#099ff5',
      navigationBarBackgroundColor: '#099ff5',
      navigationBarTitleText: '高考之家',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#999',
      selectedColor: '#099ff5',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/index',
        text: '资讯'
      }, {
        pagePath: 'pages/search/school',
        text: '查学校'
      }, {
        pagePath: 'pages/school/list',
        text: '圈子'
      }]
    },
    plugins: {
      wxparserPlugin: {
        version: '0.1.0',
        provider: 'wx9d4d4ffa781ff3ac'
      }
    }
  }
}
