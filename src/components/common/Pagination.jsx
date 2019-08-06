import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link">Previous</a>
      </li>
      {pages.map((page, i) => (
        <li
          className={currentPage === page ? "page-item active" : "page-item"}
          key={i}
        >
          <a className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      ))}

      <li className="page-item">
        <a className="page-link">Next</a>
      </li>
    </ul>
  );
};
Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default Pagination;
