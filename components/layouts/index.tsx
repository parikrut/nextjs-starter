import { GetUserByEmail } from "@/server/user.api";
import { DashboardFooter } from "../footer/dashboard.footer";
import { LayoutSection } from "../sections/layout.section";
import { DashboardSidebar } from "../sidebar/dashboard.sidebar";
import { TooltipProvider } from "../ui/tooltip";
import { Notification } from "../ui/notification";
import { auth } from "@/lib/auth";

export const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    const user = session?.user && await GetUserByEmail(session.user.email)

    if (!user || !user.success) {
        return <Notification variant="destructive" >
            User not logged in
        </Notification>
    }

    return (
        <TooltipProvider>
            <div className="flex flex-row min-h-screen w-full">
                <DashboardSidebar user={user.data} />
                <LayoutSection user={user.data}>
                    {children}
                </LayoutSection>
            </div>
        </TooltipProvider>
    );
};