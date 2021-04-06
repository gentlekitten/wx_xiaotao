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
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index.vue')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/cart/index.vue')
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue')
      }
    ]
  },
  {
    path: '/user/userInfo',
    name: 'UserInfo',
    component: () => import('@/views/userInfo/index.vue')
  },
  {
    path: '/user/userInfo/code',
    name: 'Code',
    component: () => import('@/views/userInfo/Code/index.vue')
  },
  {
    path: '/snackShopList',
    name: 'SnackShopList',
    component: () => import('@/views/snackShopList/index.vue')
  },
  {
    path: '/snackShop',
    name: 'SnackShop',
    component: () => import('@/views/snackShop/index.vue')
  },
  {
    path: '/snackShop/bigImg',
    name: 'BigImg',
    component: () => import('@/views/snackShop/bigImg/index.vue')
  },
  {
    path: '/shopInfoView',
    name: 'ShopInfoView',
    component: () => import('@/views/shopInfoView/index.vue')
  },
  {
    path: '/takeOutShop',
    name: 'TakeOutShop',
    component: () => import('@/views/takeOutShop/index.vue')
  },
  {
    path: '/takeOutShopList',
    name: 'TakeOutShopList',
    component: () => import('@/views/takeOutShopList/index.vue')
  },
  {
    path: '/expressage',
    name: 'Expressage',
    component: () => import('@/views/expressage/index.vue')
  },
  {
    path: '/user/userInfo/addressList',
    name: 'AddressList',
    component: () => import('@/views/userInfo/addressList/index.vue')
  },
  {
    path: '/user/userInfo/editAddress',
    name: 'EditAddress',
    component: () => import('@/views/userInfo/editAddress/index.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/report/index.vue')
  },
  {
    path: '/chatView',
    name: 'ChatView',
    component: () => import('@/views/chatView/index.vue')
  },
  {
    path: '/orderPeople',
    name: 'OrderPeople',
    component: () => import('@/views/orderPeople/index.vue')
  },
  {
    path: '/orderPeople/taskSendType',
    name: 'TaskSendType',
    component: () => import('@/views/orderPeople/taskSendType/index.vue')
  },
  {
    path: '/orderPeople/taskSend',
    name: 'TaskSend',
    component: () => import('@/views/orderPeople/taskSend/index.vue')
  },
  {
    path: '/orderPeople/registerOrderPeople',
    name: 'RegisterOrderPeople',
    component: () => import('@/views/orderPeople/registerOrderPeople/index.vue')
  },
  {
    path: '/orderPeople/orderPeopleList',
    name: 'OrderPeopleList',
    component: () => import('@/views/orderPeople/orderPeopleList/index.vue')
  },
  {
    path: '/orderPeople/sendTaskInfoView',
    name: 'SendTaskInfoView',
    component: () => import('@/views/orderPeople/sendTaskInfoView/index.vue')
  },
  {
    path: '/beautyMakeup',
    name: 'BeautyMakeup',
    component: () => import('@/views/beautyMakeup/index.vue')
  },
  {
    path: '/shoppingDetails',
    name: 'ShoppingDetails',
    component: () => import('@/views/shoppingDetails/index.vue')
  },
  {
    path: '/shoppingShop',
    name: 'ShoppingShop',
    component: () => import('@/views/shoppingShop/index.vue')
  },
  {
    path: '/shoppingShop/shoppingShopDetails',
    name: 'ShoppingShopDetails',
    component: () => import('@/views/shoppingShop/shoppingShopDetails/index.vue')
  },
  {
    path: '/shoppingMall',
    name: 'ShoppingMall',
    component: () => import('@/views/shoppingMall/index.vue')
  },
  {
    path: '/electronicProducts',
    name: 'ElectronicProducts',
    component: () => import('@/views/electronicProducts/index.vue')
  },
  {
    path: '/secondaryMarket',
    name: 'SecondaryMarket',
    component: () => import('@/views/secondaryMarket/index.vue')
  },
  {
    path: '/secondaryMarket/addGoods',
    name: 'SecondaryMarketAddGoods',
    component: () => import('@/views/secondaryMarket/addGoods/index.vue')
  },
  {
    path: '/secondaryMarket/shoppingDetails',
    name: 'SecondaryMarketShoppingDetails',
    component: () => import('@/views/secondaryMarket/shoppingDetails/index.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/searchReslut',
    name: 'searchReslut',
    component: () => import('@/views/searchReslut/index.vue')
  },
  {
    path: '/shoppingOrderView',
    name: 'ShoppingOrderView',
    component: () => import('@/views/shoppingOrderView/index.vue')
  },
  {
    path: '/collectionShop',
    name: 'CollectionShop',
    component: () => import('@/views/collection/collectionShop/index.vue')
  },
  {
    path: '/collectionGoods',
    name: 'CollectionGoods',
    component: () => import('@/views/collection/collectionGoods/index.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/index.vue')
  },
  {
    path: '/order/orderDetails',
    name: 'OrderDetails',
    component: () => import('@/views/order/orderDetails/index.vue')
  },
  {
    path: '/order/evaluateView',
    name: 'EvaluateView',
    component: () => import('@/views/order/evaluateView/index.vue')
  },
  {
    path: '/order/refundView',
    name: 'RefundView',
    component: () => import('@/views/order/refundView/index.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/views/feedback/index.vue')
  },
  {
    path: '/myShoppingList',
    name: 'MyShoppingList',
    component: () => import('@/views/myShoppingList/index.vue')
  },
  {
    path: '/orderDetailsOfManage',
    name: 'OrderDetailsOfManage',
    component: () => import('@/views/orderDetailsOfManage/index.vue')
  },
  {
    path: '/shoppingMange/addGoods',
    name: 'AddGoods',
    component: () => import('@/views/shoppingMange/addGoods/index.vue')
  },
  {
    path: '/shoppingMange/addGoods/settingGoodsType',
    name: 'SettingGoodsType',
    component: () => import('@/views/shoppingMange/addGoods/settingGoodsType/index.vue')
  },
  {
    path: '/shoppingMange/addGoods/goodsClassifySetting',
    name: 'GoodsClassifySetting',
    component: () => import('@/views/shoppingMange/addGoods/goodsClassifySetting/index.vue')
  },
  {
    path: '/shoppingMange/addGoods/goodsInfoEditor',
    name: 'GoodsInfoEditor',
    component: () => import('@/views/shoppingMange/addGoods/goodsInfoEditor/index.vue')
  },
  {
    path: '/shoppingMange/addGoods/goodsInventorySetting',
    name: 'GoodsInventorySetting',
    component: () => import('@/views/shoppingMange/addGoods/goodsInventorySetting/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage',
    name: 'ShopManage',
    component: () => import('@/views/shoppingMange/user/shopManage/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/selectTime',
    name: 'SelectTime',
    component: () => import('@/views/shoppingMange/user/shopManage/selectTime/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/discuntSetting',
    name: 'DiscuntSetting',
    component: () => import('@/views/shoppingMange/user/shopManage/discuntSetting/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/orderSetting',
    name: 'OrderSetting',
    component: () => import('@/views/shoppingMange/user/orderSetting/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/takeOutSetting',
    name: 'TakeOutSetting',
    component: () => import('@/views/shoppingMange/user/takeOutSetting/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/takeOutSetting/scopeSetting',
    name: 'ScopeSetting',
    component: () => import('@/views/shoppingMange/user/takeOutSetting/scopeSetting/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/statisticAnalysis',
    name: 'StatisticAnalysis',
    component: () => import('@/views/shoppingMange/user/statisticAnalysis/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/statisticAnalysis/incomeStatistic',
    name: 'IncomeStatistic',
    component: () => import('@/views/shoppingMange/user/statisticAnalysis/incomeStatistic/index.vue')
  },
  {
    path: '/shoppingMange/user/shopManage/statisticAnalysis/orderStatistic',
    name: 'OrderStatistic',
    component: () => import('@/views/shoppingMange/user/statisticAnalysis/orderStatistic/index.vue')
  },
  {
    path: '/mySiteManage/order/orderPeopleDetails',
    name: 'OrderPeopleDetails',
    component: () => import('@/views/mySiteManage/order/orderPeopleDetails/index.vue')
  },
  {
    path: '/mySiteManage/order/reportDetails',
    name: 'ReportDetails',
    component: () => import('@/views/mySiteManage/order/reportDetails/index.vue')
  },
  {
    path: '/mySiteManage/order/shopApplyDetails',
    name: 'ShopApplyDetails',
    component: () => import('@/views/mySiteManage/order/shopApplyDetails/index.vue')
  },
  {
    path: '/mySiteManage/order/feedBackDetails',
    name: 'FeedBackDetails',
    component: () => import('@/views/mySiteManage/order/feedBackDetails/index.vue')
  },
  {
    path: '/mySiteManage/user/mySiteManage',
    name: 'userMySiteManage',
    component: () => import('@/views/mySiteManage/user/mySiteManage/index.vue')
  },
  {
    path: '/mySiteManage/user/mySiteManage/scopeSetting',
    name: 'MySiteManageScopeSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/scopeSetting/index.vue')
  },
  {
    path: '/mySiteManage/user/chatManage',
    name: 'ChatManage',
    component: () => import('@/views/mySiteManage/user/chatManage/index.vue')
  },
  {
    path: '/mySiteManage/user/chatManage/serviceChat',
    name: 'ServiceChat',
    component: () => import('@/views/mySiteManage/user/chatManage/serviceChat/index.vue')
  },
  {
    path: '/mySiteManage/user/chatManage/siteChat',
    name: 'SiteChat',
    component: () => import('@/views/mySiteManage/user/chatManage/siteChat/index.vue')
  },
  {
    path: '/mySiteManage/user/chatManage/imageTextChat',
    name: 'ImageTextChat',
    component: () => import('@/views/mySiteManage/user/chatManage/imageTextChat/index.vue')
  },
  {
    path: '/mySiteManage/user/code',
    name: 'SiteCode',
    component: () => import('@/views/mySiteManage/user/code/index.vue')
  },
  {
    path: '/mySiteManage/user/statisticAnalysis',
    name: 'SiteStatisticAnalysis',
    component: () => import('@/views/mySiteManage/user/statisticAnalysis/index.vue')
  },
  {
    path: '/mySiteManage/user/assess',
    name: 'Assess',
    component: () => import('@/views/mySiteManage/user/assess/index.vue')
  },
  {
    path: '/mySiteManage/user/mySiteManage/noticeSetting',
    name: 'NoticeSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/noticeSetting/index.vue')
  },
  {
    path: '/mySiteManage/user/mySiteManage/addExpressName',
    name: 'AddExpressName',
    component: () => import('@/views/mySiteManage/user/mySiteManage/addExpressName/index.vue')
  },
  {
    path: '/mySiteManage/user/mySiteManage/snackShopSetting',
    name: 'SnackShopSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/snackShopSetting/index.vue')
  },
  {
    path: '/mySiteManage/user/mySiteManage/indexSwiperSetting',
    name: 'IndexSwiperSetting',
    component: () => import('@/views/mySiteManage/user/mySiteManage/indexSwiperSetting/index.vue')
  },
  {
    path: '/partTimeJobInfo',
    name: 'PartTimeJobInfo',
    component: () => import('@/views/partTimeJobInfo/index.vue')
  },
  {
    path: '/partTimeJobInfo/partTimeJobInfoDetails',
    name: 'PartTimeJobInfoDetails',
    component: () => import('@/views/partTimeJobInfo/partTimeJobInfoDetails/index.vue')
  },
  {
    path: '/partTimeJobInfo/addInfo',
    name: 'AddInfo',
    component: () => import('@/views/partTimeJobInfo/addInfo/index.vue')
  },
  {
    path: '/applyForSite',
    name: 'ApplyForSite',
    component: () => import('@/views/applyForSite/index.vue')
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
