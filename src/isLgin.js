import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  next()

  // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//       next()
//       NProgress.done()
//   } else {
//     /* has no token*/
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//   }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
