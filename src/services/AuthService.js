import axios from 'axios';
import { decode } from 'jsonwebtoken';

export default class AuthService {
  static get token() {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.setToken(null);
      return null;
    }
    return localStorage.getItem('token');
  }

  static get currentUser() {
    const { token } = this;
    if (!token) return null;
    return decode(this.token);
  }

  static setToken(token) {
    if (token) {
      const payload = decode(token);
      const expDate = new Date(payload.exp * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('token-exp', expDate.toString());
      return;
    }
    localStorage.clear();
  }

  static logout() {
    this.setToken(null);
  }

  static signUp(formData) {
    return axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/sign-up`,
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    })
      .then((response) => {
        const { token } = response.data;
        this.setToken(token);
      });
  }

  static signIn(formData) {
    return axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/sign-in`,
      data: {
        email: formData.email,
        password: formData.password,
      },
    })
      .then((response) => {
        const { token } = response.data;
        this.setToken(token);
      });
  }
}
