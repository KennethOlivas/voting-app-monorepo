'use client';
import { type FC } from 'react';

import { columns } from './columns';
import Table from '@/components/common/data-table';
import { useGetVoters } from '@/hooks/queries';
import FilterAndAction from '@/components/common/data-table/filters-header-actions';
import { useDataTable } from '@/hooks/use-data-table';

const VotersTable: FC = () => {
  const { data, isFetching } = useGetVoters();

  const table = useDataTable({
    pageCount: data?.totalPages ?? 0,
    data: data?.data ?? [],
    columns,
  })

  return (
    <Table
      table={table}
      isLoading={isFetching}
      header={<FilterAndAction table={table} />}
      data={data}
    />
  );
};

export default VotersTable;
