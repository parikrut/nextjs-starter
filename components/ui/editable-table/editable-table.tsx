"use client"
import { useState } from "react";
import { useForm, Control } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { toast } from "../use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InputField } from "@/components/fields/input.field";
import { DatepickerField } from "@/components/fields/datepicker.field";
import { Form } from "../form";
import { GripVertical } from "lucide-react";
import { SelectFilter } from "@/components/filters/select.filter";
import { Paging } from "../paging";
import { CheckboxField } from "@/components/fields/checkbox.field";
import { RadioField } from "@/components/fields/radio.field";
import { SelectField } from "@/components/fields/select.field";
import { TextareaField } from "@/components/fields/textarea.field";
import { SwitchField } from "@/components/fields/switch.field";
import { FieldTypes } from "@/types/field";

// Need to work on colSpan to fix the errors
export interface ColumnConfig<T> {
    name: keyof T;
    label: string;
    type: FieldTypes;
    options?: { label: string, value: any }[];  // For select, radio
    disabled?: boolean | undefined;
    colSpan?: number;
}

interface SortableTableProps<T> {
    data: T[];
    pages: number;
    schema: ZodSchema;
    columns: ColumnConfig<T>[];
    updateMany: (data: T[]) => Promise<{ success: boolean; message?: string }>;
    sortItems: (activeItem: T, overItemOrder: number) => Promise<{ success: boolean; message?: string }>;
}

const renderTableCell = (control: Control, rowIndex: number, column: ColumnConfig<any>) => {
    const name = `data.${rowIndex}.${String(column.name)}`;

    switch (column.type) {
        case 'text':
            return <InputField control={control} name={name} type={column.type} disabled={column.disabled} />;
        case 'email':
            return <InputField control={control} name={name} type={column.type} disabled={column.disabled} />;
        case 'password':
            return <InputField control={control} name={name} type={column.type} disabled={column.disabled} />;
        case 'number':
            return <InputField control={control} name={name} type={column.type} disabled={column.disabled} />;
        case 'textarea':
            return <TextareaField control={control} name={name} disabled={column.disabled} />;
        case 'select':
            return <SelectField control={control} name={name} options={column.options!} disabled={column.disabled} type={column.type} />;
        case 'multi-select':
            return <SelectField control={control} name={name} options={column.options!} disabled={column.disabled} type={column.type} />;
        case 'search-select':
            return <SelectField control={control} name={name} options={column.options!} disabled={column.disabled} type={column.type} />;
        case 'checkbox':
            return <CheckboxField control={control} name={name} disabled={column.disabled} />;
        case 'calendar':
            return <DatepickerField control={control} name={name} disabled={column.disabled} />;
        case 'radio':
            return <RadioField control={control} name={name} options={column.options!} disabled={column.disabled} />;
        case 'switch':
            return <SwitchField control={control} name={name} disabled={column.disabled} />;
        default:
            return null;

    }
};

const SortableRow = <T extends { id: number; sortOrder: number }>({
    item,
    control,
    rowIndex,
    columns
}: {
    item: T;
    control: Control;
    rowIndex: number;
    columns: ColumnConfig<T>[];
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.sortOrder.toString(), data: item });

    return (
        <TableRow
            key={item.id}
            style={{ transform: CSS.Transform.toString(transform), transition }}
        >
            <TableCell ref={setNodeRef} {...attributes} {...listeners}>
                <GripVertical className="cursor-move mt-3" />
            </TableCell>
            {columns.map((column, index) => (
                <TableCell key={index} colSpan={column.colSpan || 1}>
                    {renderTableCell(control, rowIndex, column)}
                </TableCell>
            ))}
        </TableRow>
    );
};

export const EditableTable = <T extends { id: number; sortOrder: number }>({
    data,
    pages,
    schema,
    columns,
    updateMany,
    sortItems
}: SortableTableProps<T>) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [items, setItems] = useState(data);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { data }
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        const response = await updateMany(data.data);
        if (response.success) {
            toast({ title: "Successfully updated", variant: "success" });
        } else {
            toast({ title: response.message, variant: "destructive" });
        }
    };

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        const ActiveId = Number(active.id);
        const OverId = Number(over.id);

        if (ActiveId !== OverId) {
            const activeData = active.data.current as T;
            const overData = over.data.current as T;
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.sortOrder === ActiveId);
                const newIndex = items.findIndex(item => item.sortOrder === OverId);
                return arrayMove(items, oldIndex, newIndex);
            });

            const response = await sortItems(activeData, overData.sortOrder);
            if (response.success) {
                toast({ title: "Successfully swapped the rows", variant: "success" });
            } else {
                toast({ title: "An error occurred while swapping the rows", variant: "destructive" });
            }
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(item => item.sortOrder.toString())} strategy={verticalListSortingStrategy}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} onBlur={form.handleSubmit(onSubmit)}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    {columns.map((column, index) => (
                                        <TableHead key={index} colSpan={column.colSpan || 1}>
                                            {column.label}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, index) => (
                                    <SortableRow item={item} control={form.control} key={item.sortOrder} rowIndex={index} columns={columns} />
                                ))}
                            </TableBody>
                        </Table>
                    </form>
                </Form>
                <div className="mt-2 flex items-center space-x-6 lg:space-x-8 justify-between px-2">
                    <div className="flex flex-row gap-2 items-center">
                        <SelectFilter queryKey="limit" options={[{ label: "10", value: "10" }, { label: "20", value: "20" }, { label: "30", value: "30" }, { label: "40", value: "40" }, { label: "50", value: "50" }]} label="Rows per page" placeholder="10" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Paging pageCount={pages} />
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    );
};
