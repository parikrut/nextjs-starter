"use client"
import { FilterFieldProps, FormFieldProps } from "@/types/field"
import { Combobox } from "../ui/combobox"
import { FormLabel } from "../ui/form"
import { Label } from "../ui/label"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props extends FilterFieldProps {
    options: { label: string, value: string }[]
}

export const SearchFilter = ({ queryKey, options, disabled, label, placeholder }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get(queryKey) || "";
    const router = useRouter();

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, value);
        return router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <>
            <Label>{label}</Label>
            <Combobox
                options={options}
                onSelect={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                value={currentQuery}
            />
        </>
    )
}