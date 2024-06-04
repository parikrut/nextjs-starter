"use client"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableViewOptions } from "./data-table-view-options"
import { ArrowDown, CrossIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { SearchFilter } from "@/components/filters/search.filter"
import { InputFilter } from "@/components/filters/input.filter"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const columns = table.getAllColumns()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <InputFilter
          queryKey={"query"}
          placeholder={`Search`}
        />
      </div>
      <div className="flex flex-row gap-2">
        <DataTableViewOptions table={table} />
        <Button
          size="sm"
          variant="default"
          onClick={() => router.push(pathname)}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
