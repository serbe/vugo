export default {
  isAuth (state) {
    return state.auth.authenticated
  },
  getToken (state) {
    return state.auth.authenticated ? 'Bearer ' + state.token : ''
  }
}
