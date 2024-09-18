import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

function PaginationComponent({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const pages = [];

    // Calculate start and end pages for current visible set
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    // Adjust endPage if it exceeds totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show 5 numbers or less if totalPages < 5
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // If there are more pages to the left of the first visible page
    if (startPage > 1) {
      pages.unshift("...");
    }

    // If there are more pages to the right of the last visible page
    if (endPage < totalPages) {
      pages.push("...");
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="my-4 w-full">
      <div className="mb-2 text-sm text-gray-600">
        <p className="">
          Da{" "}
          <span className="font-medium">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          a{" "}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          di <span className="font-medium">{totalItems}</span> risultati
        </p>
      </div>
      <nav
        className="flex h-px w-full justify-between bg-gray-300"
        aria-label="Pagination"
      >
        <div className="font-medium text-gray-600">
          <button
            type="button"
            className="flex items-center space-x-2 border-2 border-transparent pt-2 hover:border-t-2 hover:border-t-gray-300"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ArrowLongLeftIcon className="h-6 w-6" />
            <p>First</p>
          </button>
        </div>

        <div className="flex font-medium text-gray-600">
          {pages.map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                type="button"
                className={`w-14 border-2 border-transparent pt-2 text-center font-medium hover:border-t-2 hover:border-t-gray-300 ${
                  currentPage === page ? "border-t-gray-600" : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                <p>{page}</p>
              </button>
            ) : (
              <span
                key={index}
                className="w-14 border-2 border-transparent pt-2 text-center hover:border-t-2 hover:border-t-gray-300"
              >
                ...
              </span>
            )
          )}
        </div>
        <div className="font-medium text-gray-400">
          <button
            type="button"
            className="flex items-center space-x-2 border-2 border-transparent pt-2 hover:border-t-2 hover:border-t-gray-300"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <p>Last</p>
            <ArrowLongRightIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default PaginationComponent;
