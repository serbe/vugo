import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      authenticated: false,
      user: '',
      admin: false
    }
  },
  mutations: {
    LOGIN (state, user) {
      const newAuth = {
        authenticated: true,
        user: user.name,
        admin: user.admin
      }
      state.auth = newAuth
    },
    LOGOUT (state) {
      state.auth.authenticated = false
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('LOGIN', user)
    },
    logout ({ commit }) {
      commit('LOGOUT')
    }
  }
})
