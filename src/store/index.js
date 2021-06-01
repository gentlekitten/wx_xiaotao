import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import addGoods from './modules/shoppingManage/addGoods'
import secondaryMarket from './modules/secondaryMarket/addGoods'
import addShopping from './modules/shoppingManage/addShopping'
import scopeSetting from './modules/siteManage/scopeSetting'
import indexCacheData from './modules/index/cacheData'
import userCacheData from './modules/user/cacheData'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: { addGoods, addShopping, scopeSetting, secondaryMarket, indexCacheData, userCacheData }
})
