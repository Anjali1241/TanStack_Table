import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import jsonData from "../json/data";
import { useState, useMemo } from "react";

function TaskTable() {
  const [data] = useState(jsonData);

  const columns = useMemo(
    () => [
      {
        header: "UserId",
        accessorKey: "userId",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        header: "Id",
        accessorKey: "id",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        header: "Title",
        accessorKey: "title",
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        header: "IsCompleted",
        accessorKey: "completed",
        cell: (props) => <p>{props.getValue() ? "Yes" : "No"}</p>,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div>
        <label>
          Page Size:
          <select
            //important
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              // important
              table.setPageSize(Number(e.target.value));
              // table.setPageIndex(0); // Reset to the first page when pageSize changes
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </label>

        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>{header.column.columnDef.header}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous page
          </button>
          <span>{` Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}</span>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next page
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskTable;
