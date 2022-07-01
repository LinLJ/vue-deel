import Cookies from 'js-cookie';
const TokenKey = 'Admin-Token';

export function getToken() {
  // return Cookies.get(TokenKey)
  const ls = JSON.parse(localStorage.getItem('token'));
  return ls ? ls.token : {};
}

export function setToken(token) {
  localStorage.getItem('token', token);
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
