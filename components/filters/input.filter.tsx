"use client"
import { FilterFieldProps, FormFieldProps } from "@/types/field"
import { Combobox } from "../ui/combobox"
import { FormLabel } from "../ui/form"
import { Label } from "../ui/label"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { useState } from "react"

interface Props extends FilterFieldProps { }

export const InputFilter = ({ queryKey, disabled, label, placeholder }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get(queryKey) || "";
    const [value, setValue] = useState(currentQuery);
    const router = useRouter();

    const handlePush = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, value);
        return router.push(`${pathname}?${params.toString()}`);
    }

    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
            handlePush(value);
        }
    }

    return (
        <>
            <Label>{label}</Label>
            <Input
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => handlePush(value)}
                onKeyDown={handleKeyDown}
                className="w-48"
            />
        </>
    )
}