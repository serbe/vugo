export default {
  LOGIN (state, user) {
    const newAuth = {
      authenticated: true,
      user: user.name,
      admin: user.admin
    }
    state.auth = newAuth
  },
  LOGOUT (state) {
    const newAuth = {
      authenticated: false,
      user: '',
      admin: false
    }
    state.auth = newAuth
    state.token = ''
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}
