import http from "../services/HttpService";
import { apiMovieUrl } from "../config.json";
export function getMovies() {
  return http.get(`${apiMovieUrl}movies`);
}
export function getMovie(movieId) {
  movieId = parseInt(movieId);
  return http.get(`${apiMovieUrl}movies/${movieId}`);
}
export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    return http.put(`${apiMovieUrl}movies/${movie.id}`, body);
  }
  return http.post(`${apiMovieUrl}movies`, movie);
}
export function deleteMovies(id) {
  return http.delete(`${apiMovieUrl}movies/${id}`);
}
