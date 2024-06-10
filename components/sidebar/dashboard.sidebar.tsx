"use client"
import { ROUTES } from "@/lib/routes"
import { ArrowLeft, Home, PanelLeft, Settings } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { NavigationLinks } from "../ui/navigation"
import { LogoutForm } from "../forms/user/logout.form"
import { useSidebar } from "@/hooks/useSidebar"
import { usePathname } from "next/navigation"
import { Roles } from "@/lib/authorization"
import { ROUTE_LINKS } from "@/lib/links"
import { User } from "@prisma/client"


export function DashboardSidebar({ user }: { user: User }) {
    const { isOpen, toggle } = useSidebar();
    const pathname = usePathname();
    const currentRole = pathname.split("/")[2]?.toUpperCase();
    const NavItems: {
        title: string;
        icon: any;
        link: string;
    }[] = ROUTE_LINKS.filter((link) => link.type === currentRole);


    return (
        <div
            data-collapsed={isOpen}
            className={`fixed hidden border-r bg-white md:block transition-all duration-300 ${isOpen ? 'w-80' : "w-20"}`}>
            <div className="flex h-screen flex-col gap-2">
                <div className="flex flex-row justify-between h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    {isOpen && <h5>Logo</h5>}
                    <div className="relative">
                        <ArrowLeft
                            className={cn(
                                "absolute cursor-pointer rounded-full border bg-white text-foreground",
                                !isOpen && "rotate-180",
                                !isOpen ? "-top-3" : "-top-3 left-3",
                            )}
                            onClick={toggle}
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <NavigationLinks
                            isCollapsed={!isOpen}
                            links={NavItems}
                        />
                    </nav>
                </div>
                <div className="mt-auto p-2 border-t">
                    <LogoutForm isCollapsed={!isOpen} />
                </div>
            </div>
        </div>
    );
}

export const DashboardMobileSidebar = () => {
    const pathname = usePathname();
    const currentRole = pathname.split("/")[2].toUpperCase();
    const NavItems: {
        title: string;
        icon: any;
        link: string;
    }[] = ROUTE_LINKS.filter((link) => link.type === currentRole);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex flex-row justify-between h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <h5>Logo</h5>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavigationLinks
                                isCollapsed={false}
                                links={NavItems}
                            />
                        </nav>
                    </div>
                    <div className="mt-auto p-2 border-t">
                        <LogoutForm isCollapsed={false} />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}