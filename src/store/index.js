import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import shopInfo from './modules/shopInfo'
import addressInfo from './modules/addressInfo'
import addGoods from './modules/shoppingManage/addGoods'
import secondaryMarket from './modules/secondaryMarket/addGoods'
import addShopping from './modules/shoppingManage/addShopping'
import scopeSetting from './modules/siteManage/scopeSetting'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: { user, shopInfo, addressInfo, addGoods, addShopping, scopeSetting, secondaryMarket }
})
