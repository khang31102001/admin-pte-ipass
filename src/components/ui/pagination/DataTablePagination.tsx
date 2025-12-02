import React from "react";

interface DataTablePaginationProps {
  page: number;                // current page (1-based)
  pageSize: number;            // rows per page
  total: number;               // total items
  pageSizeOptions?: number[];  // [15,30,50,100]
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  page,
  pageSize,
  total,
  pageSizeOptions = [15, 30, 50, 100],
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handleFirst = () => canPrev && onPageChange(1);
  const handlePrev = () => canPrev && onPageChange(page - 1);
  const handleNext = () => canNext && onPageChange(page + 1);
  const handleLast = () => canNext && onPageChange(totalPages);

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT: rows per page + range */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm">Rows per page</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                onPageSizeChange(newSize);
                onPageChange(1); // reset về page 1
              }}
              className="h-8 rounded-md border border-gray-300 bg-white px-2 pr-6 text-xs sm:text-sm text-gray-700 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {/* Arrow icon */}
            <span className="pointer-events-none absolute inset-y-0 right-1 flex items-center text-[10px] text-gray-400">
              ▲
            </span>
          </div>
        </div>

        <span className="text-xs text-gray-500">
          {start}-{end} of {total}
        </span>
      </div>

      {/* RIGHT: pagination controls */}
      <div className="flex items-center gap-1">
        <PaginationIconButton
          aria-label="First page"
          disabled={!canPrev}
          onClick={handleFirst}
        >
          {/* |< */}
          <span className="text-[10px]">&laquo;</span>
        </PaginationIconButton>

        <PaginationIconButton
          aria-label="Previous page"
          disabled={!canPrev}
          onClick={handlePrev}
        >
          <span className="text-[10px]">&lsaquo;</span>
        </PaginationIconButton>

        <div className="flex items-center gap-2 px-2 text-xs sm:text-sm text-gray-600">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!Number.isNaN(val)) {
                const next = Math.min(Math.max(val, 1), totalPages);
                onPageChange(next);
              }
            }}
            className="h-8 w-12 rounded-md border border-gray-300 bg-white text-center text-xs sm:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <span className="text-xs text-gray-500">
            of <span className="font-medium">{totalPages}</span>
          </span>
        </div>

        <PaginationIconButton
          aria-label="Next page"
          disabled={!canNext}
          onClick={handleNext}
        >
          <span className="text-[10px]">&rsaquo;</span>
        </PaginationIconButton>

        <PaginationIconButton
          aria-label="Last page"
          disabled={!canNext}
          onClick={handleLast}
        >
          {/* >| */}
          <span className="text-[10px]">&raquo;</span>
        </PaginationIconButton>
      </div>
    </div>
  );
};

interface PaginationIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {__dummy?: never;}

const PaginationIconButton: React.FC<PaginationIconButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  const base =
    "flex h-8 w-8 items-center justify-center rounded-md border text-xs transition";

  const enabled =
    "border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400";
  const disabled =
    "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300";

  return (
    <button
      type="button"
      {...props}
      className={`${base} ${
        props.disabled ? disabled : enabled
      } ${className}`}
    >
      {children}
    </button>
  );
};
