"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { buttonVariants } from "./button"
import { usePathname } from "next/navigation"


export interface NavProps {
    isCollapsed: boolean
    links: {
        title: string
        label?: string
        icon: LucideIcon
        link: string
    }[]
}

export function NavigationLinks({ links, isCollapsed }: NavProps) {
    const pathname = usePathname()
    return (
        <nav className="grid gap-5 transition-all duration-300">
            {links.map((link, index) => {
                const variant = (pathname === link.link) ? "default" : "ghost"

                return isCollapsed ? (
                    <Tooltip key={index} delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Link
                                href={link.link}
                                className={cn(
                                    buttonVariants({ variant: variant, size: "icon" }),
                                    "h-12 w-12",
                                    variant === "default" &&
                                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                )}
                            >
                                <link.icon className="h-6 w-6" />
                                <span className="sr-only">{link.title}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="flex items-center gap-4">
                            {link.title}
                            {link.label && (
                                <span className="ml-auto text-muted-foreground">
                                    {link.label}
                                </span>
                            )}
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Link
                        key={index}
                        href={link.link}
                        className={cn(
                            buttonVariants({ variant: variant, size: "sm" }),
                            "h-12",
                            variant === "default" &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start"
                        )}
                    >
                        <link.icon className="mr-2 h-6 w-6" />
                        {link.title}
                        {link.label && (
                            <span
                                className={cn(
                                    "ml-auto",
                                    variant === "default" &&
                                    "text-background dark:text-white"
                                )}
                            >
                                {link.label}
                            </span>
                        )}
                    </Link>
                )
            }
            )}
        </nav>
    )
}