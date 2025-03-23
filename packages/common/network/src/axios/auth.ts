import Cookies from "js-cookie";

const AccessTokenKey = "ACCESS_TOKEN";
const RefreshTokenKey = "REFRESH_TOKEN";

export function getToken() {
  return Cookies.get(AccessTokenKey);
}

export function setToken(token: string) {
  return Cookies.set(AccessTokenKey, token);
}

export function removeToken() {
  return Cookies.remove(AccessTokenKey);
}
// 刷新token
export const getRefreshToken = () => {
  return Cookies.get(RefreshTokenKey);
};
