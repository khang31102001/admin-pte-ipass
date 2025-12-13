import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string | React.ReactNode;
  render?: (row: T) => React.ReactNode;

  headerClassName?: string;
  cellClassName?: string;
}

interface TableComponentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  maxHeight?: string;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  isClickable?: boolean;
}

export default function TableComponent<T>({
  columns,
  data,
  maxHeight = "70vh",
  emptyText = "Không có dữ liệu",
  onRowClick
}: TableComponentProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* accent top (optional) */}
      {/* <div className="h-1 w-full bg-[#F6E10E]" /> */}

      <div className="w-full overflow-auto table-scroll-wrapper smooth-scroll" style={{ maxHeight }}>
        <Table className="min-w-[720px] table-auto">
          {/* HEADER: bg #04016C */}
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="bg-[#04016C]">
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  isHeader
                  className={[
                    "px-3 py-2 sm:px-4 sm:py-3",
                    "text-start text-[11px] sm:text-xs font-semibold uppercase tracking-wide",
                    "text-white whitespace-nowrap",
                    "border-b border-white/10",
                    col.headerClassName || "",
                  ].join(" ")}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <TableRow className="bg-white">
                <TableCell className="px-4 py-10 text-center text-sm text-gray-500">
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={[
                    "cursor-pointer",
                    "group transition-colors ",
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]",
                    "hover:bg-brand-600",

                  ].join(" ")}
                >
                  {columns.map((col) => {
                    const content = col.render ? col.render(row) : (row as any)[col.key];
                    const isClickable = !!onRowClick && col.key !== "select";
                    return (
                      <TableCell
                        key={String(col.key)}
                        className={[
                          "px-3 py-2 sm:px-4 sm:py-3",
                          "align-top text-start text-sm whitespace-nowrap",
                          "text-[#111827]",
                          "group-hover:text-white",
                          "group-hover:[&_.muted]:text-white/80",
                          "group-hover:[&_.badge]:border-white/25 group-hover:[&_.badge]:text-white",
                          col.cellClassName || "",
                        ].join(" ")}
                      >
                           {isClickable ? (
                            <button
                            type="button"
                            className="w-full text-left hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRowClick?.(row);
                            }}
                          >
                            {content}
                          </button>
                           ):(
                            content
                           ) }
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* bottom bar */}
      <div className="h-[2px] w-full bg-[#04016C]" />
    </div>
  );
}
