import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import moment from 'moment'
import _ from 'lodash'
import '@/plugins/vant'
import './style/index.less'
import '@/assets/css/iconfont.css'
import './isLgin'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import handleCode from '@/assets/js/handleDataCode.js' // 自定义全局处理接口返回code不是0的处理

// 配置请求的跟路径

import echarts from 'echarts'


Vue.config.productionTip = false

Vue.use(VueQuillEditor)


Vue.prototype.$echarts = echarts
Vue.prototype._ = _

Vue.use(handleCode)

// .vue???,{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}
// Vue.filter('datefmt', function (input, fmtstring) {
//   return moment(input).format(fmtstring)
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
