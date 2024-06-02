"use client"
import { Control } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FormFieldProps } from "@/types/field"
import { HTMLInputTypeAttribute } from "react"

interface InputFieldProps extends FormFieldProps {
    type: HTMLInputTypeAttribute
}

export const InputField = ({
    control,
    label,
    placeholder,
    name,
    type,
    description,
    disabled
}: InputFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} type={type} {...field} disabled={disabled} />
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