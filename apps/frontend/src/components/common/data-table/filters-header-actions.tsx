import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import React, { JSX } from 'react';
import { type Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { InputSearch } from './input-search';

type Props<T extends object> = {
  table: Table<T>;
  extraRight?: JSX.Element;
};

const FilterAndAction = <T extends object>({
  table,
  extraRight,
}: Props<T>): JSX.Element => {
  return (
    <section className="flex flex-wrap justify-start space-x-0 space-y-4 py-4 sm:justify-between sm:space-x-2 md:flex-nowrap md:space-y-0">
      <InputSearch table={table} />
      <div className="flex space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {extraRight}
      </div>
    </section>
  );
};

export default FilterAndAction;
