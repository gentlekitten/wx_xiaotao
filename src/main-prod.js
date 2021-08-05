import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/vant'
import './style/index.less'
import '@/assets/css/iconfont.css'
import './isLgin'

import handleCode from '@/assets/js/handleDataCode.js' // 自定义全局处理接口返回code不是0的处理
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(VueQuillEditor)
Vue.use(handleCode)


Vue.prototype.$echarts = echarts
Vue.prototype._ = _
// Vue.prototype.$bus = new Vue()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
