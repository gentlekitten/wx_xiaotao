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

// 外卖删除sessionStorage名单
const takeOutList = ['ShopInfoView', 'SnackShop', 'TakeOutShop']
// 用户没在站点路由无法点击名单
const noSiteRouterList = ['/snackShopList', '/expressage', '/takeOutShopList', '/partTimeJobInfo', '/orderPeople']

router.beforeEach(async (to, from, next) => {
  // let backlen = history.length - 1
  // history.go(-backlen)
  // start progress bar
  NProgress.start()
  if (window.sessionStorage.getItem('cartList') || window.sessionStorage.getItem('shopInfoObj')) {
    if (takeOutList.indexOf(to.name) > -1) {
      next()
      return false
    }
    if (window.sessionStorage.getItem('cartList')) {
      window.sessionStorage.removeItem('cartList')
    }
    if (window.sessionStorage.getItem('shopInfoObj')) {
      window.sessionStorage.removeItem('shopInfoObj')
    }
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
          if (noSiteRouterList.indexOf(to.path) > -1) {
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
