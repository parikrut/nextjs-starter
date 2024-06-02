"use client"
import { Control } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FormFieldProps } from "@/types/field"
import { HTMLInputTypeAttribute } from "react"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"

interface Props extends FormFieldProps { }

export const CheckboxField = ({
    control,
    label,
    name,
    description,
    disabled
}: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                            disabled={disabled}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            {label}
                        </FormLabel>
                        <FormDescription>
                            {description}
                        </FormDescription>
                    </div>
                </FormItem>
            )}
        />
    )
}