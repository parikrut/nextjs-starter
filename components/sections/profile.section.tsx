import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GetUserByEmail } from "@/server/user.api";
import { Notification } from "../ui/notification";
import { UpdateProfileForm } from "../forms/user/updateProfile.form";
import { ProfilePictureForm } from "./profilePicture.section";

export const ProfileSection = async ({ email }: { email: string }) => {
    const user = await GetUserByEmail(email)

    if (!user.success) {
        return <Notification variant="destructive" >
            {user.message}
        </Notification>
    }


    return (
        <div className="grid grid-cols-3">
            <Card className="m-5">
                <CardHeader>
                    <CardTitle>
                        Picture
                    </CardTitle>
                    <CardDescription>
                        Update your profile picture
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfilePictureForm user={user.data} />
                </CardContent>
            </Card>
            <Card className="m-5 col-span-2">
                <CardHeader>
                    <CardTitle>
                        Profile
                    </CardTitle>
                    <CardDescription>
                        Update your profile information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateProfileForm user={user.data} />
                </CardContent>
            </Card>
        </div>
    )
}

export const ProfileSectionSkeleton = () => {
    return (
        <div className="grid grid-cols-3">
            <Card className="m-5">
                <CardHeader>
                    <CardTitle>
                        Picture
                    </CardTitle>
                    <CardDescription>
                        Update your profile picture
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse bg-gray-200 h-28"></div>
                </CardContent>
            </Card>
            <Card className="m-5 col-span-2">
                <CardHeader>
                    <CardTitle>
                        Profile
                    </CardTitle>
                    <CardDescription>
                        Update your profile information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse bg-gray-200 h-28"></div>
                </CardContent>
            </Card>
        </div>
    )
}