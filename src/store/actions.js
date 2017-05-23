export default {
  login ({ commit }, user) {
    commit('LOGIN', user)
  },
  logout ({ commit }) {
    commit('LOGOUT')
  }
}
