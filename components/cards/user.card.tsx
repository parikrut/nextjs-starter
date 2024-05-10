import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { GetUserById } from "@/server/user.api";
import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const UserCard = async ({ id }: { id: string }) => {
    const user = await GetUserById(id)

    if (!user.success) {
        return <span>Something went wrong</span>
    }

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>{user.data.name}</CardTitle>
                <CardDescription>
                    {user.data.email}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {user.data.emailVerified ? "Verified" : "Not verified"}
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href={ROUTES.dashboard}>
                        Go Back
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export const UserCardSkeleton = () => {
    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>
                    <div className="animate-pulse bg-gray-200 h-6"></div>
                </CardTitle>
                <CardDescription>
                    <div className="animate-pulse bg-gray-200 h-6 "></div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="animate-pulse bg-gray-200 h-6 w-1/2"></div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <div className="animate-pulse bg-gray-200 h-10"></div>
                </Button>
            </CardFooter>
        </Card>
    )
}