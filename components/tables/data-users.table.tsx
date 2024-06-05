"use client"
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@prisma/client"
import { DataTableColumnHeader } from "../ui/data-table/data-table-column-header"
import { format } from "date-fns"
import { DataTable } from "../ui/data-table/data-table"
import { GetAllUsers } from "@/server/user.api"
import { Notification } from "../ui/notification"

export const DataUserTable = async ({ users, pages }: { users: User[], pages: number }) => {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Id" />
            ),
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[500px] truncate font-medium">
                            {row.getValue("name")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[500px] truncate font-medium">
                            {row.getValue("email")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Joined on" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[500px] truncate font-medium">
                            {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy")}
                        </span>
                    </div>
                )
            },
        },
    ]

    return <DataTable data={users} columns={columns} pages={pages} />
}