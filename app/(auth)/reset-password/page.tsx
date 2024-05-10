import { ResetPasswordSection, ResetPasswordSectionSkeleton } from "@/components/sections/resetPassword.section";
import { ROUTES } from "@/lib/routes";
import { SearchParamsProps } from "@/types/common";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Page({ searchParams }: SearchParamsProps) {
    if (!searchParams?.query) redirect(ROUTES.login)

    return <Suspense fallback={<ResetPasswordSectionSkeleton />} key={Math.random()}>
        <ResetPasswordSection uniqueId={searchParams?.query} />
    </Suspense>
}
