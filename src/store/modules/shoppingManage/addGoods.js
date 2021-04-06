const state = {
    categoryId: null,
    inventory: 0,
    detailUrl: '',
    addGoodsForm: {},
    productInfoSpecifications: [],
    productInfoProperties: [],
    // 保存页面已经上传的图片
    imgList: {}
}

const mutations = {
    CATEGORY_ID: (state, categoryId) => {
        state.categoryId = categoryId
    },
    INVENTORY: (state, inventory) => {
        state.inventory = inventory
    },
    DETAIL_URL: (state, detailUrl) => {
        state.detailUrl = detailUrl
    },
    UPDATE_DATA: (state, data) => {
        state.categoryId = data.categoryId
        state.inventory = data.inventory
        state.detailUrl = data.detailUrl
        state.addGoodsForm = data.addGoodsForm
        state.imgList = data.imgList
        state.productInfoProperties = data.productInfoProperties
        state.productInfoSpecifications = data.productInfoSpecifications
    },
    IMG_LIST: (state, imgList) => {
        state.imgList.logoImg = imgList.logoImg
        state.imgList.swiperImg = imgList.swiperImg
    },
    SET_GOODS_ATTRIBUTE: (state, data) => {
        state.productInfoProperties = data.productInfoProperties
        state.productInfoSpecifications = data.productInfoSpecifications
    }

}

const actions = {
    addressList: ({ commit }, address) => {
        commit('ADDRESS_LIST', address)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
