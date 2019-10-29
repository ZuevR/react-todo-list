import axios from 'axios';
import { decode } from 'jsonwebtoken';

export default class AuthService {
  static get getCurrentUser() {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.setToken(null);
      return null;
    }
    return decode(localStorage.getItem('token'));
  }

  static setToken = (token) => {
    if (token) {
      const payload = decode(token);
      const expDate = new Date(payload.exp * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('token-exp', expDate.toString());
      return;
    }
    localStorage.clear();
  };

  static isAuth() {
    return !!this.getCurrentUser;
  }

  static signUp(formData) {
    return axios({
      method: 'POST',
      url: `${process.env.API_URL}/auth/sign-up`,
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
      url: `${process.env.API_URL}/auth/sign-in`,
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
  }
}
