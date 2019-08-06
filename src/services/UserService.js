import http from "../services/HttpService";
import { apiEndpoint2 } from "../config.json";
export function registration(user) {
  return http.post(`${apiEndpoint2}api/register`, {
    email: user.email,
    password: user.password
  });
}
