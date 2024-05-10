"use client"
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AlertDialogProvider } from "./alertDialogProvider";

export function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
    return (
        <SessionProvider session={session}>
            <AlertDialogProvider>
                {children}
            </AlertDialogProvider>
            <Toaster />
        </SessionProvider>
    )
}