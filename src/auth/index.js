export default {
  user: {
    authenticated: false
  },
  getToken () {
    return localStorage.getItem('token')
  },
  login (token) {
    localStorage.setItem('token', token)
    const currentDate = new Date()
    localStorage.setItem('expire', currentDate.valueOf() + 86400000)
    this.user.authenticated = true
  },
  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('expire')
    this.user.authenticated = false
  },
  checkAuth () {
    const token = this.getToken()
    let expireDate = localStorage.getItem('expire')
    const currentDate = new Date()
    // this.user.authenticated = !!token
    if (!!token && expireDate < currentDate) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
  isAuth () {
    // return !!this.getToken()
    return this.user.authenticated
  },
  getAuthHeader () {
    return `Bearer ${this.getToken()}`
  }
}
