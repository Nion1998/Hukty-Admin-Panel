import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startItem = (currentPage - 1) * postsPerPage + 1;
  const endItem = Math.min(currentPage * postsPerPage, totalPosts);

  return (
    <div className="d-flex algn-item-center justify-content-between">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end ">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li
                className={`page-item ${currentPage === page ? "active" : ""}`}
                key={page}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <div className="pagination-info  fs-16">
        Showing {startItem} to {endItem} of {totalPosts}
      </div>
    </div>
  );
};

export default Pagination;
