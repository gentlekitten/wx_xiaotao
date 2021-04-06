import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import '@/plugins/vant'
import './style/index.less'
import '@/assets/css/iconfont.css'
import './isLgin'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import qs from 'qs'
// 配置请求的跟路径

import echarts from 'echarts'

let Base64 = require('js-base64').Base64;

Vue.config.productionTip = false

Vue.use(VueQuillEditor)


Vue.prototype.$echarts = echarts
Vue.prototype.$base64 = Base64
Vue.prototype.$qs = qs

// .vue???,{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}
Vue.filter('datefmt', function (input, fmtstring) {
  return moment(input).format(fmtstring)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
