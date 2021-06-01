const state = {
    swiperList: [],
    shopList: []
}

const mutations = {
    SWIPER_LIST: (state, swiperList) => {
        state.swiperList = swiperList
    },
    SHOP_LIST: (state, shopList) => {
        state.shopList = shopList
    },
}

const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
