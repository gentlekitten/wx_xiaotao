const state = {
    userInfo: {
        headImgUrl: '',
        nickName: '',
        productRecordNum: 0,
        shopRecordNum: 0,
        deliveryPersonId: '',
        siteId: ''
    }
}

const mutations = {
    USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
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
