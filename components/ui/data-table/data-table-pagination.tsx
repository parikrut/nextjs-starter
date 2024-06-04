"use client"
import { Table } from "@tanstack/react-table"
import { SelectFilter } from "@/components/filters/select.filter"
import { Paging } from "../paging"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center space-x-6 lg:space-x-8 justify-between px-2">
      <div className="flex flex-row gap-2 items-center">
        <SelectFilter
          queryKey="limit"
          options={[
            { label: "10", value: "10" },
            { label: "20", value: "20" },
            { label: "30", value: "30" },
            { label: "40", value: "40" },
            { label: "50", value: "50" },
          ]}
          label="Rows per page"
          placeholder="10"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Paging pageCount={table.getPageCount()} />
      </div>
    </div>
  )
}
