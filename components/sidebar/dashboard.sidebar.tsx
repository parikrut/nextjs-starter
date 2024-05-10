import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ROUTES } from "@/lib/routes"
import { Home, PanelLeft, Settings } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"

const Navigation = ({
    icon,
    label,
    link,
}: {
    link: string
    icon: React.ReactNode
    label: string
}) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={link}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    {icon}
                    <span className="sr-only">{label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

const NavigationMobile = ({
    icon,
    label,
    link,
}: {
    link: string
    icon: React.ReactNode
    label: string
}) => (
    <Link
        href={link}
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    >
        {icon}
        {label}
    </Link>
)

export const DashboardSidebar = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Navigation
                    link={ROUTES.dashboard}
                    icon={<Home className="h-5 w-5" />}
                    label="Home"
                />
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <Navigation
                    link={ROUTES.dashboard}
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                />
            </nav>
        </aside>
    )
}

export const DashboardMobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <NavigationMobile
                        link={ROUTES.dashboard}
                        icon={<Home className="h-5 w-5" />}
                        label="Home"
                    />
                    <NavigationMobile
                        link={ROUTES.dashboard}
                        icon={<Settings className="h-5 w-5" />}
                        label="Settings"
                    />
                </nav>
            </SheetContent>
        </Sheet>
    )
}