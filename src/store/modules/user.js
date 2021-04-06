const state = {
  user: null, // 用户信息
  token: null // 用户Token
}

const mutations = {
  USER: (state, user) => {
    state.user = user
  },
  TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  user({ commit }, user) {
    commit('USER', user)
  },
  token({ commit }, token) {
    commit('TOKEN', token)
  },
  login({ commit }) {
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
