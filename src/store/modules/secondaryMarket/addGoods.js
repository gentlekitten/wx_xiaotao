const state = {
    productDetailAddress: '',
    logoImg: [],
    swiperImg: [],
    addGoodsForm: {}
}

const mutations = {
    PRODUCT_DETAIL_ADDRESS: (state, productDetailAddress) => {
        state.productDetailAddress = productDetailAddress
    },
    ADD_GOODS_FORM: (state, data) => {
        state, addGoodsForm = data
    },
    UPDATE_DATA: (state, data) => {
        state.productDetailAddress = data.productDetailAddress
        state.logoImg = data.logoImg
        state.swiperImg = data.swiperImg
        state.addGoodsForm = data.addGoodsForm
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
