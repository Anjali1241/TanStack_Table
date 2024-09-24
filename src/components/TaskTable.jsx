import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import jsonData from "../json/data";
import { useState } from "react";
function TaskTable() {
  const [data, setData] = useState(jsonData);
  const columns = [
    {
      header: "UserId",
      accessorKey : "userId",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Id",
      accessorKey : "id",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Title",
      accessorKey : "title",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "IsCompleted",
      accessorKey : "completed",
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];
  const tableData = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(tableData);
  return (
    <div>
      <div>
        <table>
          <thead>
            {tableData.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>{header.column.columnDef.header}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {tableData.getRowModel().rows.map((row) => 
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => 
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;
