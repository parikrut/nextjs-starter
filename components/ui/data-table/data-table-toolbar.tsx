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
  const [search, setSearch] = useState(columns[0].id)
  const pathname = usePathname()
  const router = useRouter()
  console.log({
    pathname
  })
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <InputFilter
          queryKey={search}
          placeholder={`Search by ${search}`}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="capitalize"
            >
              <p className="flex flex-row items-center gap-0">
                {search} &nbsp; <ArrowDown className="h-3 w-3" />
              </p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {table.getState().searchBy.map((searchBy, key) => (
              <DropdownMenuItem key={key} onClick={() => setSearch(searchBy)} className="capitalize">
                {searchBy}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
