import * as genresAPI from "./fakeGenresService";
const movies = [
  {
    _id: 1,
    title: "Terminator",
    genre: { _id: 1, name: "Action" },
    numberInStock: 1,
    dailyRentalRate: 0.5,
    liked: true
  },
  {
    _id: 2,
    title: "Hellboy",
    genre: { _id: 1, name: "Action" },
    numberInStock: 3,
    dailyRentalRate: 2.5
  },
  {
    _id: 3,
    title: "Fast & Furious ",
    genre: { _id: 1, name: "Action" },
    numberInStock: 2,
    dailyRentalRate: 3.5
  },
  {
    _id: 4,
    title: "Captain America",
    genre: { _id: 1, name: "Action" },
    numberInStock: 4,
    dailyRentalRate: 4.5
  },
  {
    _id: 5,
    title: "Us",
    genre: { _id: 2, name: "Horror" },
    numberInStock: 4,
    dailyRentalRate: 4.5
  },
  {
    _id: 6,
    title: "Pet Sematary",
    genre: { _id: 2, name: "Horror" },
    numberInStock: 1,
    dailyRentalRate: 0.5
  },
  {
    _id: 7,
    title: "Child's Play",
    genre: { _id: 2, name: "Horror" },
    numberInStock: 2,
    dailyRentalRate: 2.5
  },
  {
    _id: 8,
    title: "Scary Stories ",
    genre: { _id: 2, name: "Horror" },
    numberInStock: 3,
    dailyRentalRate: 1.5
  },
  {
    _id: 9,
    title: "Zombieland:Double Tap",
    genre: { _id: 3, name: "Comedy" },
    numberInStock: 3,
    dailyRentalRate: 4.5
  },
  {
    _id: 10,
    title: "The Beach Bum",
    genre: { _id: 3, name: "Comedy" },
    numberInStock: 2,
    dailyRentalRate: 1.5
  },
  {
    _id: 11,
    title: "Toy Story 4",
    genre: { _id: 3, name: "Comedy" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: 12,
    title: "Shazam!",
    genre: { _id: 3, name: "Comedy" },
    numberInStock: 1,
    dailyRentalRate: 2.5
  }
];
export function getMovies() {
  return movies;
}
export function getMovie(id) {
  return movies.find(movie => movie._id === id);
}
export function saveMovie(movie) {
  console.log(typeof movie.genreId);
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find(
    g => g._id === parseInt(movie.genreId)
  );
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }
  return movieInDb;
}
