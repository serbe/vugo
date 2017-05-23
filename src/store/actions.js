export default {
  login ({ commit }, user) {
    commit('LOGIN', user)
  },
  logout ({ commit }) {
    commit('LOGOUT')
  },
  setToken ({ commit }, token) {
    commit('SET_TOKEN', token)
  }
}
