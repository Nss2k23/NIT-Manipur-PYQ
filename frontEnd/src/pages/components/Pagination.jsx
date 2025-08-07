const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-4 gap-2">
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
      Prev
    </button>

    {[...Array(totalPages).keys()].map((num) => (
      <button
        key={num}
        className={currentPage === num + 1 ? "font-bold" : ""}
        onClick={() => onPageChange(num + 1)}
      >
        {num + 1}
      </button>
    ))}

    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={currentPage === totalPages ||  totalPages=== 0} onClick={() => onPageChange(currentPage + 1)}>
      Next
    </button>
  </div>
);

export default Pagination;
