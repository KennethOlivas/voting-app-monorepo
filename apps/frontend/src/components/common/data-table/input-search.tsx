import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Table } from "@tanstack/react-table";
import { JSX, useEffect, useState } from "react";

type Props<T extends object> = {
    table: Table<T>;
};

export const InputSearch = <T extends object>({
    table,
}: Props<T>): JSX.Element => {

    const [searchValue, setSearchValue] = useState("");
    const debouncedValue = useDebounce(searchValue, 1000);

    useEffect(() => {
        table.setGlobalFilter(debouncedValue);
    }, [debouncedValue, table]);

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <Input
            placeholder="Search..."
            onChange={onSearch}
            value={searchValue}
            className="w-full sm:max-w-sm"
        />
    )
}