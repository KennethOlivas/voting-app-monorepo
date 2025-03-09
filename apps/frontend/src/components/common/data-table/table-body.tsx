import { Skeleton } from '@/components/ui/skeleton';
import {
  TableBody as TableBodyUI,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { type Table, flexRender } from '@tanstack/react-table';

type Props<T extends object> = {
  table: Table<T>;
  isLoading: boolean;
};

const TableBody = <T extends object>({ isLoading, table }: Props<T>) => {
  if (isLoading) {
    return (
      <TableBodyUI>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                <div className="flex-row-reverse space-y-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBodyUI>
    );
  }

  return (
    <TableBodyUI>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBodyUI>
  );
};

export default TableBody;
