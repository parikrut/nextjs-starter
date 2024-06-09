import { DashboardFooter } from "../footer/dashboard.footer";
import { DashboardHeader } from "../header/dashboard.header";
import { LayoutSection } from "../sections/layout.section";
import { DashboardSidebar } from "../sidebar/dashboard.sidebar";
import { TooltipProvider } from "../ui/tooltip";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TooltipProvider>
            <div className="flex flex-row min-h-screen w-full">
                <DashboardSidebar />
                <LayoutSection>
                    {children}
                </LayoutSection>
            </div>
        </TooltipProvider>
    );
};