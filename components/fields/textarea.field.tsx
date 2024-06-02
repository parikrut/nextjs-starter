"use client"
import { Control } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FormFieldProps } from "@/types/field"
import { HTMLInputTypeAttribute } from "react"
import { Textarea } from "../ui/textarea"

interface Props extends FormFieldProps { }

export const TextareaField = ({
    control,
    label,
    placeholder,
    name,
    description,
    disabled
}: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} disabled={disabled} />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}