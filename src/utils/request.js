import axios from 'axios'
// import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Toast } from 'vant'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration
// create an axios instance
const service = axios.create({
  // https://jixi.mynatapp.cc/wechat
  baseURL: 'https://jixi.mynatapp.cc/wechat',
  timeout: 300000,
  // transformRequest: [data => qs.stringify(data)]
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    // Nprogress.start()
    if (config.showLoading && config.showLoading.showLoading) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 5000
      })
    }
    return config
  },
  error => {
    console.log(error)
    Toast.fail('出错啦~，请稍后再试')
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // Nprogress.done()
    if (response.config.showLoading && response.config.showLoading.showLoading) {
      Toast.clear()
    }
    const res = response.data
    return res
  },
  error => {
    console.log(error)
    Toast.fail('出错啦~，请稍后再试')
    return Promise.reject(error)
  }
)

export default service
