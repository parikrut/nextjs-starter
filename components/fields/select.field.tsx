"use client"
import { Control } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FormFieldProps } from "@/types/field"
import { HTMLInputTypeAttribute } from "react"
import { Textarea } from "../ui/textarea"
import { MultiSelect } from "../ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Combobox } from "../ui/combobox"

interface Props extends FormFieldProps {
    options: { label: string, value: string }[]
    type: "select" | "multi-select" | "search-select"
}

export const SelectField = ({
    control,
    label,
    placeholder,
    name,
    description,
    disabled,
    options,
    type
}: Props) => {

    if (type === "multi-select") {
        return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <MultiSelect
                                options={options}
                                onValueChange={field.onChange}
                                placeholder={placeholder || "Select options"}
                                variant="inverted"
                                disabled={disabled}
                                defaultValue={field.value}
                            />
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

    if (type === "search-select") {
        return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Combobox
                                options={options}
                                onSelect={field.onChange}
                                placeholder={placeholder}
                                disabled={disabled}
                                {...field}
                            />
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

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                        <FormControl>
                            <SelectTrigger disabled={disabled}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}