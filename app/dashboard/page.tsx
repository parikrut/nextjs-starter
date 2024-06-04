import { UserList, UserListSkeleton } from "@/components/lists/user.list";
import { UserTable } from "@/components/tables/users.table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SearchParamsProps } from "@/types/common";
import { Suspense } from "react";

interface UserListProps {
    searchParams: {
        id?: string;
        email?: string;
        name?: string;
    }
}

export default async function page({ searchParams }: SearchParamsProps & UserListProps) {
    const currentPage = Number(searchParams?.page) || 1;
    const currentLimit = Number(searchParams?.limit) || 10;
    const currentSearchById = searchParams?.id;
    const currentSearchByEmail = searchParams?.email;
    const currentSearchByName = searchParams?.name;

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        List of all users in the system
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<UserListSkeleton />} key={Math.random()}>
                        <UserList page={currentPage} limit={currentLimit} search={{
                            id: currentSearchById,
                            email: currentSearchByEmail,
                            name: currentSearchByName
                        }} />
                    </Suspense>
                </CardContent>
            </Card>
        </main>
    )
}
