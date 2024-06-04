"use client"

import { Column } from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import { SortFilter } from "@/components/filters/sort.filter"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {

  return (
    <div className={cn("flex items-center space-x-2 -ml-3", className)}>
      <SortFilter
        queryKey="sort"
        disabled={false}
        label={title}
        id={column.id}
      />
    </div>
  )
}
