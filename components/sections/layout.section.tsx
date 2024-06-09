"use client"
import { useSidebar } from "@/hooks/useSidebar";
import { DashboardFooter } from "../footer/dashboard.footer"
import { DashboardHeader } from "../header/dashboard.header"

export const LayoutSection = ({ children }: { children: React.ReactNode }) => {
    const { isOpen } = useSidebar();

    return (
        <main className={`w-full flex flex-col transition-all duration-300 ${isOpen ? "ml-80" : "ml-20"}`}>
            <DashboardHeader />
            <div className="py-5 bg-slate-50">
                {children}
            </div>
            <DashboardFooter />
        </main>
    )
}