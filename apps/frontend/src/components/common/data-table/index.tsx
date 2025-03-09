import TableHeader from '@/components/common/data-table/table-header';
import TableBody from '@/components/common/data-table/table-body';
import Pagination from '@/components/common/data-table/pagination';
import { Table as TableComponent } from '@/components/ui/table';
import type { Table } from '@tanstack/react-table';
import type { ReactNode } from 'react';

type Props<T extends object> = {
  header?: ReactNode;
  table: Table<T>;
  isLoading: boolean;
  data?: T[];
};

const Table = <T extends object>({
  isLoading,
  table,
  data,
  header,
}: Props<T>): React.JSX.Element => {
  return (
    <div className="w-full">
      {header}
      <div className="rounded-md border">
        <TableComponent>
          <TableHeader table={table} />
          <TableBody table={table} isLoading={isLoading} />
        </TableComponent>
      </div>
      <Pagination data={data} table={table} />
    </div>
  );
};

export default Table;
