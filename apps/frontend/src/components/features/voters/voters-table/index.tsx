'use client';

import {
  type GlobalFilterColumn,
  type RowSelectionState,
  type SortingState,
  type Table as TableType,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type FC, useState } from 'react';

import { columns } from './columns';
import Table from '@/components/common/data-table';
import { VoterDto } from '@voting-app/schemas';
import { useGetVoters } from '@/hooks/queries';
import FilterAndAction from '@/components/common/data-table/filters-header-actions';

const VotersTable: FC = () => {
  const { data, isLoading } = useGetVoters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<GlobalFilterColumn>();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table: TableType<VoterDto> = useReactTable({
    data: data?.data ?? [],
    columns,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <Table
      table={table}
      isLoading={isLoading}
      header={<FilterAndAction table={table} />}
      data={data}
    />
  );
};

export default VotersTable;
