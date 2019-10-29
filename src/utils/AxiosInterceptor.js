import axios from 'axios';
import AuthService from '../services/AuthService';

class AxiosInterceptor {
  constructor(config) {
    const axiosInstance = axios.create(config);
    axiosInstance
      .interceptors
      .request
      .use((request) => this.requestHandler(request));
    return axiosInstance;
  }

  requestHandler = (request) => {
    request.headers.token = AuthService.token;
    return request;
  };
}

const MyAxios = new AxiosInterceptor();

export default MyAxios;
