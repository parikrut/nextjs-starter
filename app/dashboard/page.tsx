import { UserList, UserListSkeleton } from "@/components/lists/user.list";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SearchParamsProps } from "@/types/common";
import { Suspense } from "react";


export default async function page({
    searchParams
}: Readonly<SearchParamsProps>) {
    const currentPage = Number(searchParams?.page) || 1;

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
                        <UserList page={currentPage} />
                    </Suspense>
                </CardContent>
            </Card>
        </main>
    )
}
