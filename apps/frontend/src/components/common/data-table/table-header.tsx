import {
  TableHead,
  TableHeader as TableHeaderShadcn,
  TableRow,
} from '@/components/ui/table';
import { flexRender, type Table } from '@tanstack/react-table';

type Props<T extends object> = {
  table: Table<T>;
};

const TableHeader = <T extends object>({ table }: Props<T>) => {
  return (
    <TableHeaderShadcn>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeaderShadcn>
  );
};

export default TableHeader;
