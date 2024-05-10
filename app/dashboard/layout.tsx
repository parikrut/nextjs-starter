import { DashboardHeader } from "@/components/header/dashboard.header";
import { DashboardSidebar } from "@/components/sidebar/dashboard.sidebar";
import { Separator } from "@/components/ui/separator"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <DashboardSidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <DashboardHeader />
                <Separator />
                {children}
            </div>
        </div>
    );
}