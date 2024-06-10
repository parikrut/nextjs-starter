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

export type FieldTypes = "text" | "email" | "password" | "number" | "textarea" | "select" | "multi-select" | "search-select" | "checkbox" | "calendar" | "radio" | "switch" | "custom";