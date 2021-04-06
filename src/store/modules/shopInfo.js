const state = {
  shopItem: []
}

const mutations = {
  SHOP_ITEM: (state, shopItem) => {
    state.shopItem = shopItem
  },
  SNACK_COMMON_SHOP_LIST: (state, snackCommonShopList) => {
    state.snackCommonShopList = snackCommonShopList
  }
}

const actions = {
  shopItem: ({ commit }, shopItem) => {
    commit('SHOP_ITEM', shopItem)
  },
  shopItsnackCommonShopListem: ({ commit }, snackCommonShopList) => {
    commit('SNACK_COMMON_SHOP_LIST', snackCommonShopList)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
