"use client"
import { SelectFilter } from "@/components/filters/select.filter"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Paging } from "../paging"
import { User } from "@prisma/client"
import { format } from "date-fns"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { toast } from "../use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SortUsers, UpdateManyUsers } from "@/server/user.api"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField } from "@/components/fields/input.field"
import { DatepickerField } from "@/components/fields/datepicker.field"
import { Form } from "../form"

const formSchema = z.object({
    users: z.array(
        z.object({
            id: z.coerce.number(),
            name: z.coerce.string(),
            email: z.coerce.string().email(),
            createdAt: z.coerce.date(),
        })
    )
})

const SortableRows = (
    { user, form, rowIndex }:
        { user: User, form: any, rowIndex: number }
) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: user.sortOrder.toString(), data: user });

    return (
        <TableRow
            key={user.id}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <TableCell
                ref={setNodeRef}
                {...attributes}
                {...listeners}>
                <GripVertical
                    className="cursor-move mt-3"
                />
            </TableCell>
            <TableCell>
                <InputField
                    control={form.control}
                    name={`users.${rowIndex}.id`}
                    type="number"
                    disabled
                />
            </TableCell>
            <TableCell>
                <InputField
                    control={form.control}
                    name={`users.${rowIndex}.name`}
                    type="text"
                />
            </TableCell>
            <TableCell>
                <InputField
                    control={form.control}
                    name={`users.${rowIndex}.email`}
                    type="email"
                    disabled
                />
            </TableCell>
            <TableCell>
                <DatepickerField
                    control={form.control}
                    name={`users.${rowIndex}.createdAt`}
                    disabled
                />
            </TableCell>
        </TableRow>
    )
}

export const EditableTable = ({ users, pages }: { users: User[], pages: number }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const [items, setItems] = useState(users);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            users: users
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await UpdateManyUsers(data.users as User[]);
        if (response.success) {
            toast({
                title: "Successfully updated",
                variant: "success"
            });
        }
        else {
            toast({
                title: response.message,
                variant: "destructive"
            })
        }
    }


    async function handleDragEnd(event: any) {
        const { active, over } = event;
        const ActiveId = Number(active.id);
        const OverId = Number(over.id);

        if (ActiveId !== OverId) {
            const activeData = active.data.current as User;
            const overData = over.data.current as User;
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.sortOrder === ActiveId);
                const newIndex = items.findIndex(item => item.sortOrder === OverId);
                return arrayMove(items, oldIndex, newIndex);
            });

            const response = await SortUsers(activeData, overData.sortOrder)
            if (response.success) {
                toast({
                    title: "Successfully swapped the rows",
                    variant: "success"
                });
            }
            else {
                toast({
                    title: "An error occurred while swapping the rows",
                    variant: "destructive"
                })
            }
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((user) => user.sortOrder.toString())}
                strategy={verticalListSortingStrategy}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        onBlur={form.handleSubmit(onSubmit)}
                    >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Joined on</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((user, index) => (<SortableRows
                                    user={user}
                                    form={form}
                                    key={user.sortOrder}
                                    rowIndex={index}
                                />))}
                            </TableBody>
                        </Table>
                    </form>
                </Form>
                <div className="mt-2 flex items-center space-x-6 lg:space-x-8 justify-between px-2">
                    <div className="flex flex-row gap-2 items-center">
                        <SelectFilter
                            queryKey="limit"
                            options={[
                                { label: "10", value: "10" },
                                { label: "20", value: "20" },
                                { label: "30", value: "30" },
                                { label: "40", value: "40" },
                                { label: "50", value: "50" },
                            ]}
                            label="Rows per page"
                            placeholder="10"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Paging pageCount={pages} />
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    )
}