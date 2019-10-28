import axios from 'axios';
import { API_URL } from '../constants';

export default class AuthService {
  getCurrentUser() {
    const { token } = this;
    if (!token) return null;
    return axios({
      method: 'GET',
      url: `${API_URL}/auth/check-identity`,
      headers: { token },
    });
  }

  get token() {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.setToken(null);
      return null;
    }
    return localStorage.getItem('token');
  }

  static setToken(token) {
    if (token) {
      const expDate = new Date(token.exp * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('token-exp', expDate.toString());
      return;
    }
    localStorage.clear();
  }

  isAuth() {
    return !!this.token;
  }

  signUp(formData) {
    return axios({
      method: 'POST',
      url: `${API_URL}/auth/sign-up`,
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    })
      .then((token) => this.setToken(token));
  }

  static signIn(formData) {
    return axios({
      method: 'POST',
      url: `${API_URL}/auth/sign-in`,
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
  }
}
