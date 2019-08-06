import React, { Component } from "react";
import Like from "../components/common/Like";
import Table from "./common/Table";
import { Link } from "react-router-dom";
import auth from "../services/AuthService";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: m => <Link to={`/movies/${m.id}`}>{m.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "NumberInStock" },
    { path: "dailyRentalRate", label: "DailyRentalRate" },
    {
      key: "like",
      content: m => (
        <Like liked={m.liked} onClick={() => this.props.onLike(m)} />
      )
    }
  ];
  constructor() {
    super();
    const user = auth.getUser();
    if (user && user.isAdmin)
      this.columns.push({
        key: "delete",
        content: m => (
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(m)}
          >
            Delete
          </button>
        )
      });
  }
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
