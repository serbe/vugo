export default {
  user: {
    authenticated: false,
  },
  getToken() {
    return localStorage.getItem('token');
  },
  login(token) {
    localStorage.setItem('token', token);
    this.user.authenticated = true;
  },
  logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false;
  },
  checkAuth() {
    const token = this.getToken();
    if (token) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }
  },
  isAuth() {
    return !!this.getToken();
  },
  getAuthHeader() {
    return `Bearer ${this.getToken()}`;
  },
};
