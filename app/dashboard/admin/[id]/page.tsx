import { UserCard, UserCardSkeleton } from "@/components/cards/user.card";
import { ROUTES } from "@/lib/routes";
import { IdParamsProps } from "@/types/common";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Page({ params }: IdParamsProps) {

    if (!params?.id) redirect(ROUTES.dashboard);

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <Suspense fallback={<UserCardSkeleton />} key={Math.random()}>
                <UserCard id={params?.id} />
            </Suspense>
        </main>
    )
}