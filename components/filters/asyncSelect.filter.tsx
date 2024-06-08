"use client"

import { useState } from "react"
import { AsyncSelect } from "../ui/async-select"
import { Label } from "../ui/label"
import { IResponse } from "@/types/common"
import { toast } from "../ui/use-toast"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FilterFieldProps } from "@/types/field"

interface Props extends FilterFieldProps {
    searchFunction: ({ query }: { query: string, limit: number }) => Promise<IResponse<any[]>>
    option: {
        label: string
        value: string
    },
}

export const AsyncSelectFilter = ({
    label,
    disabled,
    searchFunction,
    option,
    queryKey,
    placeholder = "Search"
}: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get(queryKey) || '{}';
    const router = useRouter();
    const data = JSON.parse(currentQuery);

    const callback = async (inputValue: string) => {
        const response = await searchFunction({ query: inputValue, limit: 100 })
        if (response.success) {
            const options = response.data.map((item) => ({
                label: item[option.label],
                value: item[option.value]
            }))
            return options
        } else {
            toast({
                title: "Error",
                variant: "destructive",
                description: response.message ?? "An error occurred while fetching data",
            })
        }
    }

    const handleChange = (data: { label: any, value: any }) => {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, JSON.stringify(data));
        return router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <Label>{label}</Label>
            <AsyncSelect
                placeholder={placeholder}
                value={Object.keys(data).length ? data : undefined}
                onChange={handleChange as unknown as any}
                isDisabled={disabled}
                loadOptions={callback}
            />
        </>
    )
}