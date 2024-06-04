"use client"
import { FilterFieldProps, FormFieldProps } from "@/types/field"
import { Combobox } from "../ui/combobox"
import { FormLabel } from "../ui/form"
import { Label } from "../ui/label"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface Props extends FilterFieldProps {
    id: string
}

export const SortFilter = ({ queryKey, disabled, label, id }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get(queryKey) || "{}";
    const router = useRouter();
    const state = JSON.parse(currentQuery)[id] === "asc" ? false : true

    const handleChange = () => {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, JSON.stringify({ [id]: state ? "asc" : "desc" }));
        return router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={handleChange}
            >
                {label}
                {
                    state ? (
                        <ArrowDownIcon className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpIcon className="ml-2 h-4 w-4" />
                    )
                }
            </Button>
        </>
    )
}