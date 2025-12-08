import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

export interface TableColumn<T> {
  key: keyof T | string; // accessor key
  header: string | React.ReactNode;        // header label
  render?: (row: T) => React.ReactNode; // custom render function
  headerClassName?: string;
  cellClassName?: string;
}

interface TableComponentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

export default function TableComponent<T>({
  columns,
  data,
}: TableComponentProps<T>) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="overflow-x-auto w-full ">
        <Table className="!min-w-max w-full table-fixed ">
          {/* Table Header */}
          <TableHeader className=" border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  isHeader
                  className={[
                    "px-6 py-3  font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap",
                    col.headerClassName || "",
                  ].join(" ")}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={[
                      "px-6 py-3 whitespace-nowrap font-medium text-gray-500 text-start text-theme-sm dark:text-gray-400 align-top",
                      col.cellClassName || "",
                    ].join(" ")}
                  >
                    {col.render
                      ? col.render(row)
                      : (row as any)[col.key]} {/* fallback nếu không có render */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
