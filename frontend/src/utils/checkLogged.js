import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

// Return user id if refresh token still available, or return false
export const checkLogged = () => {
  let token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    const refresh = jwt_decode(token.refresh)
    const isExpired = dayjs.unix(refresh.exp).diff(dayjs()) < 1
    if (!isExpired) {
      return true
    }
  }
  return false
}