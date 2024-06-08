import { FormFieldProps } from "@/types/field"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AsyncSelect } from "../ui/async-select"

interface Props extends FormFieldProps {
    options: { label: string, value: string }[]
    callback: (inputValue: string, callback: (options: any) => void) => {
        label: string
        value: string
    }[]
}

export const AsyncSelectField = ({
    control,
    label,
    name,
    description,
    disabled,
    options,
    placeholder,
    callback
}: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <AsyncSelect
                            placeholder={placeholder}
                            isDisabled={disabled}
                            options={options}
                            loadOptions={callback}
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