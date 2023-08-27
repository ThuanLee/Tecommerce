import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'dayjs';
import dayjs from 'dayjs';

// Tạo một instance Axios với base URL mặc định
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.interceptors.response.use(
  (response) => {
    // Kiểm tra mã trạng thái phản hồi
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    // Xử lý lỗi chung
    console.log('Auth error');
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(async request => {
  // Get token
  let keepLogin = JSON.parse(localStorage.getItem('keepLogin'))
  let token = JSON.parse(localStorage.getItem('token'))

  if (!keepLogin) {
    token = JSON.parse(sessionStorage.getItem('token'))
  }

  if (!token) {
    return request
  }

  let access = jwt_decode(token.access)
  let isAccessExpired = dayjs.unix(access.exp).diff(dayjs()) < 1

  if (isAccessExpired) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/token/refresh/`, {
        refresh: token.refresh
      })
      if (keepLogin) {
        localStorage.setItem('token', JSON.stringify(response.data))
      } else {
        sessionStorage.setItem('token', JSON.stringify(response.data))
      }
    } catch (error) {
      // If refresh token expired, remove token in local storage
      if (error.response.data.detail === "Token is invalid or expired") {
        localStorage.removeItem('token')
        localStorage.removeItem('keepLogin')
        sessionStorage.removeItem('token')
        return request
      }
    }
  }

  if (keepLogin) {
    token = JSON.parse(localStorage.getItem('token'))
  } else {
    token = JSON.parse(sessionStorage.getItem('token'))
  }

  request.headers.Authorization = `Bearer ${token.access}`
  return request
})

export default instance