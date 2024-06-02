"use client"
import { FilterFieldProps, FormFieldProps } from "@/types/field"
import { Label } from "../ui/label"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "../ui/checkbox"

interface Props extends FilterFieldProps { }

export const CheckboxFilter = ({ queryKey, disabled, label }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get(queryKey) || "";
    const router = useRouter();
    const currentValue = currentQuery === "true" ? true : false

    const handleChange = (checked: boolean) => {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, checked.toString());
        return router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="flex flex-row gap-2 items-center">
            <Checkbox
                disabled={disabled}
                checked={currentValue}
                onCheckedChange={handleChange}
            />
            <Label>{label}</Label>
        </div>
    )
}