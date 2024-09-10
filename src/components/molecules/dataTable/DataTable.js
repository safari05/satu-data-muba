"use client";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ImageFallback, TextInput } from "@/components/atoms";
import { PaginationNav } from "../paginationNav";

export const DataTable = ({ data = [], column = [] }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  var columns = [];
  column.map((item) => {
    if (item.selector) {
      columns.push(
        columnHelper.accessor(item.name, {
          header: () => item.header,
          cell: (info) =>
            !item.selector ? info.getValue() : item.selector(info),
          filterFn: "fuzzy",
        })
      );
    } else {
      columns.push(
        columnHelper.accessor(item.name, {
          header: () => item.header,
          filterFn: "fuzzy",
        })
      );
    }
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });
  if (data.length === 0)
    return (
      <center>
        <ImageFallback
          src={"/assets/svg/ilus-empty-dataset.svg"}
          alt="empty-dataset"
          width={300}
          height={285}
          className="w-[300px] h-[285px] object-contain rounded-md my-16"
          fallbackSrc={"/assets/svg/ilus-empty-dataset.svg"}
        />
        <h1 className="text-white">Ups, sepertinya tidak ada data!</h1>
      </center>
    );
  return (
    <>
      <div className="flex flex-col">
        <div className="flex md:flex-nowrap flex-wrap gap-3 justify-between items-center mb-2">
          <div className="flex gap-3 items-center text-white text-base">
            Show{" "}
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="text-black"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>{" "}
            entries
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="text-white text-base">Pencarian :</h3>
            <TextInput
              placeholder="Masukan Kata Kunci..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full rounded-lg">
                <thead className="bg-gray-200 border-b">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="w-6/12">
            <p className="text-white text-base">
              Showing {table.getState().pagination.pageIndex + 1} to{" "}
              {table.getState().pagination.pageSize} of {table.getPageCount()}{" "}
              entries
            </p>
          </div>

          <PaginationCategory
            pageCount={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            setPageIndex={table.setPageIndex}
          />
        </div>
      </div>
    </>
  );
};

function PaginationCategory({ setPageIndex, pageIndex, pageCount }) {
  return (
    <div className="flex gap-3 flex-wrap justify-end">
      <PaginationNav
        gotoPage={setPageIndex}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < pageCount - 1}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </div>
  );
}
