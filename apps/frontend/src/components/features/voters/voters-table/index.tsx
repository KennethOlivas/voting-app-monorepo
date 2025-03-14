'use client';


import { type FC } from 'react';

import { columns } from './columns';
import Table from '@/components/common/data-table';
import { useGetVoters } from '@/hooks/queries';
import FilterAndAction from '@/components/common/data-table/filters-header-actions';
import useDataTable from '@/hooks/useDataTable';

const VotersTable: FC = () => {
  const { data, isLoading } = useGetVoters();
  console.log(data);

  const table = useDataTable({
    columns: columns,
    data: data || [],
    pageCount: 0,
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
