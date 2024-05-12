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


export const UserList = async ({
    page
}: {
    page: number;
}) => {
    const users = await GetAllUsers({
        page
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
                    {users.data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <Button variant="link" asChild>
                                    <Link href={`${ROUTES.dashboard}/${user.id}`}>
                                        View profile
                                    </Link>
                                </Button>
                            </TableCell>
                            <TableCell>
                                {
                                    user.emailVerified ?
                                        <UnverifyUser id={user.id} /> :
                                        <VerifyUser id={user.id} />

                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Paging pageCount={users.pages || 1} />
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