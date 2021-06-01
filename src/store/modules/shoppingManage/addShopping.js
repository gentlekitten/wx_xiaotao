const state = {
    imgList: {
        shopLogoImg: [],
        shopQualificationImg: []
    },
    form: {}
}

const mutations = {
    IMG_LIST: (state, data) => {
        state.imgList.shopQualificationImg = data.shopQualificationImg
        state.imgList.shopLogoImg = data.shopLogoImg
    },
    UPDATE_DATA: (state, data) => {
        state.time = data.time
        state.discounts = data.discounts
        state.imgList = data.imgList
        state.form = data.form
    }
}

const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
