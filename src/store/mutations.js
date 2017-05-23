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
    state.auth.authenticated = false
  }
}
