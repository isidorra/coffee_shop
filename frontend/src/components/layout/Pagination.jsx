const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);
  return (
    <div className="grid grid-cols-12 mt-10">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`p-2 text-lg font-semibold ${currentPage === pageNumber && "border-b border-secondary"}`}
        >
          {pageNumber + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
