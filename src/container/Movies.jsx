import React, { Component } from "react";
import Pagination from "./../components/common/Pagination";
import MoviesTable from "./../components/MoviesTable";
import ListGroup from "./../components/common/ListGroup";
import { toast } from "react-toastify";
import { getMovies, deleteMovies } from "../services/MovieService";
import { getGenres } from "../services/GenresService";
import { paginate } from "./../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./../components/common/SearchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 10,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m.id !== movie.id);
    this.setState({ movies });
    try {
      await deleteMovies(movie.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie is already been deleted");
        this.setState({ movies: originalMovies });
      }
    }
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenresSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state;
    let filterd = allMovies;
    if (searchQuery) {
      filterd = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre.id) {
      filterd = allMovies.filter(m => m.genre.id === selectedGenre.id);
    }
    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filterd.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      genres,
      searchQuery
    } = this.state;
    if (count === 0) return <strong>There are no movies in database.</strong>;
    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelected={this.handleGenresSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link to={`/movies/new`} className="btn btn-primary btn-sm">
              New Movie
            </Link>
          )}
          <p> showing {totalCount} movies in database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
