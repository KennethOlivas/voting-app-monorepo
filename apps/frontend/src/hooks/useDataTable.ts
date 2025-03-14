import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, GlobalFilterColumn, PaginationState, RowSelectionState, SortingState, Table, TableOptions, Updater, useReactTable, VisibilityState } from "@tanstack/react-table";

import { useState } from "react";
import { usePaginationSearchParams } from "./search-params.pagination";


interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    | "state"
    | "pageCount"
    | "getCoreRowModel"
    | "manualFiltering"
    | "manualPagination"
    | "manualSorting"
  >, Required<Pick<TableOptions<TData>, "pageCount">> {

}


export function useDataTable<TData>({
  pageCount = -1,
  initialState,
  ...props
}: UseDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<GlobalFilterColumn>();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [{ pageIndex, pageSize }, setData] = usePaginationSearchParams();

  const pagination: PaginationState = {
    pageIndex: pageIndex - 1, // zero-based index -> one-based index
    pageSize: pageSize,
  };

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === "function") {
      const newPagination = updaterOrValue(pagination);
      void setData({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize
      });

    } else {
      void setData({
        pageIndex: updaterOrValue.pageIndex,
        pageSize: updaterOrValue.pageSize
      });
    }
  }

  const useTable: Table<TData> = useReactTable({
    ...props,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return useTable;
}

export default useDataTable;
