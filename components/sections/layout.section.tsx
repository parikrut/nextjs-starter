"use client"
import { useSidebar } from "@/hooks/useSidebar";
import { DashboardFooter } from "../footer/dashboard.footer"
import { DashboardHeader } from "../header/dashboard.header"
import { Card } from "../ui/card";

export const LayoutSection = ({ children }: { children: React.ReactNode }) => {
    const { isOpen } = useSidebar();

    return (
        <main className={`w-full flex flex-col transition-all duration-300 ${isOpen ? "ml-80" : "ml-20"}`}>
            <DashboardHeader />
            <div className="bg-slate-50 min-h-screen">
                <Card className="m-5">
                    {children}
                </Card>
            </div>
            <DashboardFooter />
        </main>
    )
}