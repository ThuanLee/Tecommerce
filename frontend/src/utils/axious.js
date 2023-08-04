import axios from 'axios';

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

export default instance