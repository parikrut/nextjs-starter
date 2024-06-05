"use client"
import { User } from "@prisma/client"
import { ColumnConfig, EditableTable } from "../ui/editable-table/editable-table"
import { z } from "zod";
import { SortUsers, UpdateManyUsers } from "@/server/user.api";
import { FieldTypes } from "@/types/field";

const userSchema = z.object({
    data: z.array(
        z.object({
            id: z.coerce.number(),
            name: z.coerce.string(),
            email: z.coerce.string().email(),
            createdAt: z.coerce.date(),
            sortOrder: z.coerce.number(),
        })
    )
})

const userColumns: ColumnConfig<User>[] = [
    { name: "id", label: "Id", type: "number", disabled: true },
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email", disabled: true },
    { name: "createdAt", label: "Joined on", type: "calendar", disabled: true },
    { name: "sortOrder", label: "Order", type: "number", disabled: true },
];


export const EditableUsersTable = ({ users, pages }: { users: User[], pages: number }) => {
    return <EditableTable data={users} pages={pages} schema={userSchema} columns={userColumns} updateMany={UpdateManyUsers} sortItems={SortUsers} />
}