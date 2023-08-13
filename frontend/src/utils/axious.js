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
    console.log('Error:', error.message);
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(async request => {
  let token = JSON.parse(localStorage.getItem('token'))
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
      localStorage.setItem('token', JSON.stringify(response.data))
    } catch (error) {
      if (error.response.data.detail === "Token is invalid or expired") {
        alert("Phiên đăng nhập đã hết hạn")
        localStorage.removeItem('token')
        return request
      }
    }
  }

  token = JSON.parse(localStorage.getItem('token'))
  request.headers.Authorization = `Bearer ${token.access}`
  return request
})

export default instance