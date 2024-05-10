"use client"
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
    return (
        <SessionProvider session={session}>
            {children}
            <Toaster />
        </SessionProvider>
    )
}