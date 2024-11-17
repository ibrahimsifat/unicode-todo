import { useTranslations } from "next-intl";
const btnStyle =
  "rounded-md border py-2 px-3 text-center text-md transition-all border-gray-600 text-slate-800 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:border-none mx-2 disabled:cursor-not-allowed";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize,
}) => {
  const t = useTranslations("dashboard");
  return (
    <div className="flex flex-col items-center space-y-6 py-6 bg-gray-50 rounded-xl max-w-2xl p-8 mx-auto my-4">
      <div className="flex items-center space-x-6">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`${btnStyle} ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-900 hover:bg-gray-400"
          }`}
          aria-label="Previous page"
        >
          {t("pagination.previous")}
        </button>

        {/* Page Information */}
        <span className="text-md font-medium text-gray-800 space-x-2">
          <span className="text-gray-800 mx-2">
            {t("pagination.page")} {page} {t("pagination.of")}
          </span>{" "}
          {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`${btnStyle} ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-900 hover:bg-gray-400"
          }`}
          aria-label="Next page"
        >
          {t("pagination.next")}
        </button>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="select text-md font-medium focus:outline-none border-gray-300"
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
