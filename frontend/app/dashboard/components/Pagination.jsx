const Pagination = ({
  page,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize,
}) => {
  return (
    <div className="flex flex-col items-center space-y-6 py-6 bg-gray-50 rounded-xl max-w-2xl p-8 mx-auto">
      <div className="flex items-center space-x-6">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`px-5 py-1 rounded-full shadow-sm text-sm font-semibold transition-all duration-200 ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-900 hover:bg-gray-400"
          }`}
          aria-label="Previous page"
        >
          Previous
        </button>

        {/* Page Information */}
        <span className="text-sm font-medium text-gray-800">
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-5 py-1 rounded-full shadow-sm text-sm font-semibold transition-all duration-200 ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-900 hover:bg-gray-400"
          }`}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      {/* Page Size Selection */}
      <div className="flex items-center space-x-3 mt-4">
        <label className="text-gray-800 text-sm font-semibold">
          Page Size:
        </label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-3 py-1 rounded-full bg-gray-300 border border-gray-700 text-gray-700 text-sm font-medium focus:outline-none"
          aria-label="Select page size"
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
