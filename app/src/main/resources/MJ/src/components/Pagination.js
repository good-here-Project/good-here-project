const Pagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  maxPage,
}) => {
  return (
    <div className="board-pagination">
      <button
        className="btn btn-default"
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
      >
        이전
      </button>
      <span className="page-number">{currentPage}</span>
      <button
        className="btn btn-default"
        onClick={handleNextPage}
        disabled={currentPage >= maxPage}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
