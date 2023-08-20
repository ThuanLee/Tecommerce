import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const removeCartItemToast = (productName) => {
  const message = 'Xóa "' + productName + '" khỏi giỏ hàng'
  toast.info(message);
}

export const addCartItemToast = (productName) => {
  const message = 'Thêm "' + productName + '" vào giỏ hàng'
  toast.success(message);
}

export const loginFirstToast = () => {
  toast.info("Hãy đăng nhập trước");
}

export const signupSuccessToast = () => {
  toast.success('Đăng ký thành công');
}

export const errorToast = (message) => {
  toast.error(message);
}
