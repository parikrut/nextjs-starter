import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetAllUsers } from "@/server/user.api";
import { Paging } from "../ui/paging";
import { VerifyUser } from "@/client/verifyUser";
import { UnverifyUser } from "@/client/unverifyUser";
import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Notification } from "../ui/notification";
import { UserTable } from "../tables/users.table";
import { GetAllParams } from "@/types/common";

export const UserList = async ({
    page,
    limit,
    search
}: GetAllParams<"name" | "id" | "email">) => {
    const users = await GetAllUsers({
        page,
        limit,
        search
    })

    if (!users.success) {
        return <Notification variant="destructive" >
            {users.message}
        </Notification>
    }

    if (users.data.length === 0) {
        return <span>No users found</span>
    }
    return (
        <>
            <UserTable users={users.data} pages={users.pages || 1} />
        </>
    )
}

export const UserListSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>View</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(10)].map((_, index) => (
                    <TableRow key={index}>
                        {[...Array(5)].map((_, index) => (
                            <TableCell key={index}>
                                <div className="h-10 bg-gray-200 animate-pulse"></div>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}