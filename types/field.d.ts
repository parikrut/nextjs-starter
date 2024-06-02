import { Control } from "react-hook-form";

export interface FormFieldProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
}

export interface FilterFieldProps {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    queryKey: string;
}