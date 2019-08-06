import http from "../services/HttpService";
import { apiEndpoint2 } from "../config.json";
const tokenKey = "token";
http.setJwt(getJwt(tokenKey));
export async function login(email, password) {
  const { data: jwt } = await http.post(`${apiEndpoint2}api/login`, {
    email,
    password
  });
  return localStorage.setItem(tokenKey, jwt.token);
}
export function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}
export function getUser() {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    const user = {
      name: "Durgesh",
      email: "singh.durgesh5@gmail.com",
      isAdmin: true
    };
    return user;
  }
}
export function loginWithToken(jwt) {
  localStorage.setItem(tokenKey, jwt.token);
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  logout,
  getUser,
  loginWithToken,
  getJwt
};
