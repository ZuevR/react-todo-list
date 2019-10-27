export default class AuthService {
  static get token() {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      AuthService.setToken(null);
      return null;
    }
    return localStorage.getItem('token');
  }

  static setToken(response) {
    if (response) {
      const expDate = new Date(response.token.expire * 1000);
      localStorage.setItem('token', response.token.id);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  static isAuth() {
    return !!AuthService.token;
  }
}
