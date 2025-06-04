// Pagination section created by ChatGPT


/**  * Props:
 *  - totalPages: Total number of pages (number)
 *  - currentPage: Current active page (number)
 *  - setCurrentPage: Function to update current page
 */ 
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  // Create array of page numbers [1, 2, ..., totalPages]
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {/* Previous page arrow button 
      When clicked move one page back, but never less than page 1.
      Math.max(1, currentPage - 1) ensures you don't go below the first page.
      */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="pagination-arrow left"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Render all page number buttons */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`pagination-page${currentPage === page ? " active" : ""}`}
        >
          {page}
        </button>
      ))}
      {/* Next page arrow button
          When clicked move one page forward, but never beyond the last page.
          Math.min(totalPages, currentPage + 1) ensures you don't exceed totalPages.
      */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className={`pagination-arrow right${
          currentPage === totalPages ? "" : " active"
        }`}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;
