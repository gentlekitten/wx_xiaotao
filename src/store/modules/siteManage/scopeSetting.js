const state = {
    address: {
        latitude: '',
        longitude: '',
        radius: ''
    },
    form: {
        username: '',
        phone: '14708701960',
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
