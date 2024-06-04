"use client"
import { FilterFieldProps, FormFieldProps } from "@/types/field"
import { Combobox } from "../ui/combobox"
import { FormLabel } from "../ui/form"
import { Label } from "../ui/label"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface Props extends FilterFieldProps {
    options: { label: string, value: string }[]
}

export const SelectFilter = ({ queryKey, options, disabled, label, placeholder }: Props) => {
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
            <Label className="whitespace-nowrap">{label}</Label>
            <Select onValueChange={handleChange} value={currentQuery}>
                <SelectTrigger disabled={disabled}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((item, index) => (
                        <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}