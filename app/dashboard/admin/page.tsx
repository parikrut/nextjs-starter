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


export default async function page({ searchParams }: SearchParamsProps) {
    const currentPage = Number(searchParams?.page) || 1;
    const currentLimit = Number(searchParams?.limit) || 10;
    const currentQuery = searchParams?.query;
    const currentSort = searchParams?.sort;
    const parseSort = JSON.parse(currentSort || "{}");
    return (
        <>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                    List of all users in the system
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<UserListSkeleton />} key={Math.random()}>
                    <UserList page={currentPage} limit={currentLimit} query={currentQuery} sort={parseSort} />
                </Suspense>
            </CardContent>
        </>
    )
}
