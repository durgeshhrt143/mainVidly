import http from "../services/HttpService";
import { apiMovieUrl } from "../config.json";
export function getGenres() {
  return http.get(`${apiMovieUrl}genres`);
}
