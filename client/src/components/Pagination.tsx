import * as React from "react";
import { PaginationProps } from "./types";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex gap-3 mt-32 max-w-full text-sm leading-loose text-gray-600 whitespace-nowrap w-[265px] max-md:mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="object-contain shrink-0 w-9 aspect-square"
        aria-label="Previous page"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/b87cf3211a932eca333ec945fcaa3095f2365c06106edf22a3636b607beaf061?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&"
          alt=""
        />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`overflow-hidden px-3 py-2 ${
            currentPage === page
              ? "bg-gray-100"
              : "border border-solid bg-black bg-opacity-0 border-black border-opacity-0"
          } rotate-[2.4492937051703357e-16rad]`}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="object-contain shrink-0 w-9 aspect-square"
        aria-label="Next page"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e7a78c669e0ead72a59432d4a8c338fc5e7320b129ae9937e503634930fc98ad?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&"
          alt=""
        />
      </button>
    </div>
  );
};
