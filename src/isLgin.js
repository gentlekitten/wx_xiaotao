import router from './router'
import NProgress from 'nprogress' // progress bar
import { Toast } from 'vant'
import 'nprogress/nprogress.css' // progress bar style


NProgress.inc(0.2);
NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach(async (to, from, next) => {
  // let backlen = history.length - 1
  // history.go(-backlen)
  // start progress bar
  NProgress.start()
  if (window.sessionStorage.getItem('cartList')) {
    if (to.name === 'ShopInfoView' || to.name === 'SnackShop') {
      next()
      return false
    }
    window.sessionStorage.removeItem('cartList')
    next()
  }
  // next()
  if (to.path === '/login') {
    next()
  } else {
    // window.sessionStorage.getItem('wxCode')
    if (true) {
      if (to.path === '/index') {
        next()
      } else {
        // next()
        const siteId = JSON.parse(window.sessionStorage.getItem('siteInfo')) ? JSON.parse(window.sessionStorage.getItem('siteInfo')).id : ''
        if (siteId) {
          next()
        } else {
          if (to.path === '/snackShopList' || to.path === '/expressage' || to.path === '/takeOutShopList' || to.path === '/secondaryMarket' || to.path === '/partTimeJobInfo' || to.path === '/orderPeople') {
            next('/index')
            Toast.fail('您所在的地区还无站点，不能操作，请谅解！')
            return false
          }
          next()
        }
      }
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
