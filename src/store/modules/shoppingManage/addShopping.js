const state = {
    time: {
        startTime: '',
        endTime: '',
    },
    discounts: {
        requirePrice: '',
        discountPrice: '',
        time: ''
    },
    imgList: {
        shopLogoImg: [],
        shopQualificationImg: []
    },
    form: {}
}

const mutations = {
    TIME: (state, time) => {
        state.time = time
    },
    DISCOUNTS: (state, discounts) => {
        state.discounts = discounts
    },
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
