import Vue from 'vue'
import VueRouter from 'vue-router'

import orderPeopleManageRouter from './modules/orderPeopleManage'
import secondaryMarketManageRouter from './modules/secondaryMarketManage'
import shoppingMangeRouter from './modules/shoppingMange'
import mySiteManageRouter from './modules/mySiteManage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index.vue'),
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/cart/index.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      }
    ]
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/agreement/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/user/userInfo',
    name: 'UserInfo',
    component: () => import('@/views/userInfo/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/payView',
    name: 'PayView',
    component: () => import('@/views/payView/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/user/userInfo/code',
    name: 'Code',
    component: () => import('@/views/userInfo/Code/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/snackShopList',
    name: 'SnackShopList',
    component: () => import('@/views/snackShopList/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/snackShop',
    name: 'SnackShop',
    component: () => import('@/views/snackShop/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shopInfoView',
    name: 'ShopInfoView',
    component: () => import('@/views/shopInfoView/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/takeOutShop',
    name: 'TakeOutShop',
    component: () => import('@/views/takeOutShop/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/takeOutShopList',
    name: 'TakeOutShopList',
    component: () => import('@/views/takeOutShopList/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/expressage',
    name: 'Expressage',
    component: () => import('@/views/expressage/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/user/userInfo/addressList',
    name: 'AddressList',
    component: () => import('@/views/userInfo/addressList/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/user/userInfo/editAddress',
    name: 'EditAddress',
    component: () => import('@/views/userInfo/editAddress/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/user/taoCoins',
    name: 'TaoCoins',
    component: () => import('@/views/user/taoCoins/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/user/taoCoins/record',
    name: 'Record',
    component: () => import('@/views/user/taoCoins/record/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/report/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/chatView',
    name: 'ChatView',
    component: () => import('@/views/chatView/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/orderPeople',
    name: 'OrderPeople',
    component: () => import('@/views/orderPeople/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/orderPeople/taskSendType',
    name: 'TaskSendType',
    component: () => import('@/views/orderPeople/taskSendType/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/orderPeople/taskSend',
    name: 'TaskSend',
    component: () => import('@/views/orderPeople/taskSend/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/orderPeople/registerOrderPeople',
    name: 'RegisterOrderPeople',
    component: () => import('@/views/orderPeople/registerOrderPeople/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/orderPeople/orderPeopleList',
    name: 'OrderPeopleList',
    component: () => import('@/views/orderPeople/orderPeopleList/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/orderPeople/sendTaskInfoView',
    name: 'SendTaskInfoView',
    component: () => import('@/views/orderPeople/sendTaskInfoView/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/beautyMakeup',
    name: 'BeautyMakeup',
    component: () => import('@/views/beautyMakeup/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingDetails',
    name: 'ShoppingDetails',
    component: () => import('@/views/shoppingDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingShop',
    name: 'ShoppingShop',
    component: () => import('@/views/shoppingShop/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingShop/shoppingShopDetails',
    name: 'ShoppingShopDetails',
    component: () => import('@/views/shoppingShop/shoppingShopDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMall',
    name: 'ShoppingMall',
    component: () => import('@/views/shoppingMall/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/electronicProducts',
    name: 'ElectronicProducts',
    component: () => import('@/views/electronicProducts/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/secondaryMarket',
    name: 'SecondaryMarket',
    component: () => import('@/views/secondaryMarket/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/secondaryMarket/addGoods',
    name: 'SecondaryMarketAddGoods',
    component: () => import('@/views/secondaryMarket/addGoods/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/secondaryMarket/shoppingDetails',
    name: 'SecondaryMarketShoppingDetails',
    component: () => import('@/views/secondaryMarket/shoppingDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/searchReslut',
    name: 'searchReslut',
    component: () => import('@/views/searchReslut/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingOrderView',
    name: 'ShoppingOrderView',
    component: () => import('@/views/shoppingOrderView/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/collectionShop',
    name: 'CollectionShop',
    component: () => import('@/views/collection/collectionShop/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/collectionGoods',
    name: 'CollectionGoods',
    component: () => import('@/views/collection/collectionGoods/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/order/orderDetails',
    name: 'OrderDetails',
    component: () => import('@/views/order/orderDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/order/evaluateView',
    name: 'EvaluateView',
    component: () => import('@/views/order/evaluateView/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/order/refundView',
    name: 'RefundView',
    component: () => import('@/views/order/refundView/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/views/feedback/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/myShoppingList',
    name: 'MyShoppingList',
    component: () => import('@/views/myShoppingList/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/orderDetailsOfManage',
    name: 'OrderDetailsOfManage',
    component: () => import('@/views/orderDetailsOfManage/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/addGoods',
    name: 'AddGoods',
    component: () => import('@/views/shoppingMange/addGoods/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/addGoods/settingGoodsType',
    name: 'SettingGoodsType',
    component: () => import('@/views/shoppingMange/addGoods/settingGoodsType/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/addGoods/goodsClassifySetting',
    name: 'GoodsClassifySetting',
    component: () => import('@/views/shoppingMange/addGoods/goodsClassifySetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/addGoods/goodsInfoEditor',
    name: 'GoodsInfoEditor',
    component: () => import('@/views/shoppingMange/addGoods/goodsInfoEditor/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/addGoods/goodsInventorySetting',
    name: 'GoodsInventorySetting',
    component: () => import('@/views/shoppingMange/addGoods/goodsInventorySetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage',
    name: 'ShopManage',
    component: () => import('@/views/shoppingMange/user/shopManage/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/selectTime',
    name: 'SelectTime',
    component: () => import('@/views/shoppingMange/user/shopManage/selectTime/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/discuntSetting',
    name: 'DiscuntSetting',
    component: () => import('@/views/shoppingMange/user/shopManage/discuntSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/orderSetting',
    name: 'OrderSetting',
    component: () => import('@/views/shoppingMange/user/orderSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/takeOutSetting',
    name: 'TakeOutSetting',
    component: () => import('@/views/shoppingMange/user/takeOutSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/takeOutSetting/scopeSetting',
    name: 'ScopeSetting',
    component: () => import('@/views/shoppingMange/user/takeOutSetting/scopeSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/statisticAnalysis',
    name: 'StatisticAnalysis',
    component: () => import('@/views/shoppingMange/user/statisticAnalysis/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/statisticAnalysis/incomeStatistic',
    name: 'IncomeStatistic',
    component: () => import('@/views/shoppingMange/user/statisticAnalysis/incomeStatistic/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/shoppingMange/user/shopManage/statisticAnalysis/orderStatistic',
    name: 'OrderStatistic',
    component: () => import('@/views/shoppingMange/user/statisticAnalysis/orderStatistic/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/order/orderPeopleDetails',
    name: 'OrderPeopleDetails',
    component: () => import('@/views/mySiteManage/order/orderPeopleDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/order/reportDetails',
    name: 'ReportDetails',
    component: () => import('@/views/mySiteManage/order/reportDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/order/shopApplyDetails',
    name: 'ShopApplyDetails',
    component: () => import('@/views/mySiteManage/order/shopApplyDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/order/feedBackDetails',
    name: 'FeedBackDetails',
    component: () => import('@/views/mySiteManage/order/feedBackDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/mySiteManage',
    name: 'userMySiteManage',
    component: () => import('@/views/mySiteManage/user/mySiteManage/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/mySiteManage/scopeSetting',
    name: 'MySiteManageScopeSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/scopeSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/mySiteManage/expressSetting',
    name: 'ExpressSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/expressSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/chatManage',
    name: 'ChatManage',
    component: () => import('@/views/mySiteManage/user/chatManage/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/chatManage/serviceChat',
    name: 'ServiceChat',
    component: () => import('@/views/mySiteManage/user/chatManage/serviceChat/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/chatManage/siteChat',
    name: 'SiteChat',
    component: () => import('@/views/mySiteManage/user/chatManage/siteChat/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/chatManage/imageTextChat',
    name: 'ImageTextChat',
    component: () => import('@/views/mySiteManage/user/chatManage/imageTextChat/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/code',
    name: 'SiteCode',
    component: () => import('@/views/mySiteManage/user/code/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/statisticAnalysis',
    name: 'SiteStatisticAnalysis',
    component: () => import('@/views/mySiteManage/user/statisticAnalysis/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/assess',
    name: 'Assess',
    component: () => import('@/views/mySiteManage/user/assess/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/mySiteManage/noticeSetting',
    name: 'NoticeSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/noticeSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/mySiteManage/addExpressName',
    name: 'AddExpressName',
    component: () => import('@/views/mySiteManage/user/mySiteManage/addExpressName/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/mySiteManage/snackShopSetting',
    name: 'SnackShopSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/snackShopSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/mySiteManage/user/mySiteManage/indexSwiperSetting',
    name: 'IndexSwiperSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/indexSwiperSetting/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/partTimeJobInfo',
    name: 'PartTimeJobInfo',
    component: () => import('@/views/partTimeJobInfo/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/partTimeJobInfo/partTimeJobInfoDetails',
    name: 'PartTimeJobInfoDetails',
    component: () => import('@/views/partTimeJobInfo/partTimeJobInfoDetails/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/partTimeJobInfo/addInfo',
    name: 'AddInfo',
    component: () => import('@/views/partTimeJobInfo/addInfo/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/applyForSite',
    name: 'ApplyForSite',
    component: () => import('@/views/applyForSite/index.vue'),
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  // 店家后台管理路由
  orderPeopleManageRouter,
  secondaryMarketManageRouter,
  shoppingMangeRouter,
  mySiteManageRouter

]

const router = new VueRouter({
  routes
})

// 解决重复点击侧边路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
