"use client"
import { FilterFieldProps, FormFieldProps } from "@/types/field"
import { Label } from "../ui/label"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"


interface Props extends FilterFieldProps {
    options: { label: string, value: string }[]
}

export const RadioFilter = ({ queryKey, options, disabled }: Props) => {
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
            <RadioGroup
                disabled={disabled}
                onValueChange={handleChange}
                defaultValue={currentQuery}
                className="flex flex-row items-center gap-3"
            >
                {options.map((option, index) => (
                    <div className="flex flex-row gap-1">
                        <RadioGroupItem value={option.value} />
                        <Label>{option.label}</Label>
                    </div>
                ))}
            </RadioGroup>
        </>
    )
}