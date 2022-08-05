import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import Cookies from 'js-cookie'
import {store} from "../features/store";
import { refreshToken } from '../features/auth/authSlice';
const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://flix-lj7prqscta-as.a.run.app/api/v1',
  });

  axiosInstance.interceptors.request.use(async req => {
    let token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) {
        return req;
      }
      try {
        await store.dispatch(refreshToken());
      } catch (error) {
        console.log("axios refresh token :", error.message)
      }
    }
    return req;
  });

  axiosInstance.interceptors.request.use(
    async config => {
      let token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

export default useAxios;
