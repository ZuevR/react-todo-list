import axios from 'axios';
import { API_URL } from '../constants';

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

  static signUp(formData) {
    return axios({
      method: 'POST',
      url: `${API_URL}/auth/sign-up`,
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    });
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
