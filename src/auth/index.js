export default {
  right_page: 'HomePage',
  user: {
    name: '',
    authenticated: false
  },
  getToken () {
    return localStorage.getItem('token')
  },
  login (data) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', data.name)
    const currentDate = new Date()
    localStorage.setItem('expire', String(currentDate.valueOf() + 86400000))
    this.user.name = data.name
    this.user.authenticated = true
  },
  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expire')
    this.user.name = ''
    this.user.authenticated = false
  },
  checkAuth () {
    const token = this.getToken()
    let expireDate = localStorage.getItem('expire')
    let userName = localStorage.getItem('user') || 'noname'
    const currentDate = new Date().valueOf()
    if (!!token && +expireDate > currentDate) {
      this.user.name = userName
      this.user.authenticated = true
    } else {
      this.user.name = ''
      this.user.authenticated = false
    }
    return this.user.authenticated
  },
  isAuth () {
    return this.user.authenticated
  },
  getAuthHeader () {
    return `Bearer ${this.getToken()}`
  }
}
