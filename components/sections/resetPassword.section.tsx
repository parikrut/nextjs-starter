import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { GetUserByUniqueId } from "@/server/user.api"
import { ResetPasswordForm } from "../forms/resetPassword"

export const ResetPasswordSection = async ({
    uniqueId
}: {
    uniqueId: string;
}) => {
    const user = await GetUserByUniqueId(uniqueId);

    if (!user.success) {
        return <span>Something went wrong</span>
    }

    return (
        <Card className="mx-auto max-w-96">
            <CardHeader>
                <CardTitle className="text-xl">
                    Hello {user.data.name}
                </CardTitle>
                <CardDescription>
                    Enter your new password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResetPasswordForm {...user.data} />
            </CardContent>
        </Card>
    )
}

export const ResetPasswordSectionSkeleton = () => {
    return (
        <Card className="mx-auto min-w-96">
            <CardHeader>
                <CardTitle className="text-xl">
                    <div className="animate-pulse bg-gray-200 h-6"></div>
                </CardTitle>
                <CardTitle className="text-xl">
                    <div className="animate-pulse bg-gray-200 h-6"></div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="animate-pulse bg-gray-200 h-10"></div>
            </CardContent>
            <CardContent className="text-xl">
                <div className="animate-pulse bg-gray-200 h-6"></div>
            </CardContent>
            <CardContent>
                <div className="animate-pulse bg-gray-200 h-10"></div>
            </CardContent>
            <CardContent>
                <div className="animate-pulse bg-gray-200 h-10"></div>
            </CardContent>
        </Card>
    )
}
