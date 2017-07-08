export default {
  setToken(token) {
    localStorage.setItem('token', token);
  },
  getToken() {
    return `Bearer ${localStorage.getItem('token')}`;
  },
  setLogged(val) {
    localStorage.setItem('logged', val);
  },
  getLogged() {
    return localStorage.getItem('logged');
  },
  login(token) {
    this.setToken(token);
    this.setLogged('true');
  },
  logout() {
    this.setToken('');
    this.setLogged('false');
  },
  isAuth() {
    return this.getLogged() === 'true';
  },
};
