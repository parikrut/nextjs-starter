"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import Link from "next/link"
import { Button } from "../ui/button"
import { DashboardMobileSidebar } from "../sidebar/dashboard.sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { SignOut } from "@/server/user.api"
import React from "react"


export const DashboardHeader = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
    const { data: session } = useSession()

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 justify-between lg:h-[60px] lg:px-6">
            <DashboardMobileSidebar />
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    {segments.map((segment, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem key={index}>
                                {index === segments.length - 1 ? (
                                    <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            key={segment}
                                            className="capitalize"
                                            href={`/${segments.slice(0, index + 1).join("/")}`}
                                        >
                                            {segment}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index !== segments.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-row gap-4 items-center">
                <span>
                    {session?.user?.name}
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={async () => await SignOut()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}