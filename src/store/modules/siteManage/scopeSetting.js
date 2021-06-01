const state = {
    address: {
        latitude: '',
        longitude: '',
        radius: ''
    },
    form: {
        username: '',
        phone: '',
        siteName: '',
        latitude: '',
        longitude: '',
        radius: ''
    }
}

const mutations = {
    ADDRESS: (state, address) => {
        state.address = address
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
