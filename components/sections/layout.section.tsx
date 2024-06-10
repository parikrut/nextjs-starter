"use client"
import { useSidebar } from "@/hooks/useSidebar";
import { DashboardFooter } from "../footer/dashboard.footer"
import { DashboardHeader } from "../header/dashboard.header"
import { Card } from "../ui/card";
import { User } from "@prisma/client";

export const LayoutSection = ({ children, user }: { children: React.ReactNode, user: User }) => {
    const { isOpen } = useSidebar();

    return (
        <main className={`w-full flex flex-col transition-all duration-300 ${isOpen ? "ml-80" : "ml-20"}`}>
            <DashboardHeader user={user} />
            <div className="bg-slate-50 min-h-screen">
                {children}
            </div>
            <DashboardFooter />
        </main>
    )
}