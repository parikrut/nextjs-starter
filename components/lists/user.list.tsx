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


export const UserList = async ({
    page
}: {
    page: number;
}) => {
    const users = await GetAllUsers({
        page
    })

    if (!users.success) {
        return <span>Something went wrong</span>
    }

    if (users.data.length === 0) {
        return <span>No users found</span>
    }
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <VerifyUser id={user.id} />
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
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(10)].map((_, index) => (
                    <TableRow key={index}>
                        {[...Array(5)].map((_, index) => (
                            <TableCell key={index}>
                                <div className="h-4 bg-gray-200 animate-pulse"></div>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}