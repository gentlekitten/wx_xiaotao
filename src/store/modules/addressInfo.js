const state = {
    addressId: 0,
    addressItem: {}
}

const mutations = {
    ID: (state, id) => {
        state.addressId = id
    },
    ADDRESS_ITEM: (state, addressItem) => {
        state.addressItem = addressItem
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
