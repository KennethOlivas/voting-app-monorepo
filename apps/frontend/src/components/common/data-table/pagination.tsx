
import { type Table } from '@tanstack/react-table';
import { usePaginationSearchParams } from "@/hooks/search-params.pagination"
import { Button } from '@/components/ui/button';
import { JSX } from 'react';

type Props<T extends object> = {
  table: Table<T>;
  data?: T[];
};

const Pagination = <T extends object>({
  table,
  data,
}: Props<T>): JSX.Element => {

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
        <Button
          variant="link"
          size="sm"
          className="ml-2"
          onClick={() => table.toggleAllRowsSelected()}
        >
          {table.getIsAllPageRowsSelected() ? 'Unselect' : 'Select'} all rows on
          this page
        </Button>
      </div>

      {data && (
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
