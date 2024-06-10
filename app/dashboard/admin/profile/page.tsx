import { ProfileSection, ProfileSectionSkeleton } from "@/components/sections/profile.section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification } from "@/components/ui/notification";
import { auth } from "@/lib/auth";
import { Suspense } from "react";

export default async function page() {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
        return <Notification variant="destructive" >
            User not logged in
        </Notification>
    }
    return (
        <Suspense fallback={<ProfileSectionSkeleton />} key={Math.random()}>
            <ProfileSection email={user.email} />
        </Suspense>
    )
}