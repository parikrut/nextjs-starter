"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CreateUser, SignIn } from "@/server/user.api"
import { useToast } from "../ui/use-toast"
import { ROUTES } from "@/lib/routes"
import { signIn } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { MultiSelect } from "../ui/multi-select"
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { Combobox } from "../ui/combobox"
import { Checkbox } from "../ui/checkbox"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Switch } from "../ui/switch"
import { InputField } from "../fields/input.field"
import { TextareaField } from "../fields/textarea.field"
import { SelectField } from "../fields/select.field"
import { CheckboxField } from "../fields/checkbox.field"
import { DatepickerField } from "../fields/datepicker.field"
import { RadioField } from "../fields/radio.field"
import { SwitchField } from "../fields/switch.field"

const frameworksList = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

const formSchema = z.object({
    text: z.string(),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(8),
    textarea: z.coerce.string(),
    select: z.coerce.string(),
    multiSelect: z.array(z.string()),
    combobox: z.coerce.string(),
    checkbox: z.coerce.boolean(),
    calendar: z.coerce.date(),
    radio: z.coerce.string(),
    switch: z.coerce.boolean(),
})

export const UniversalForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // "text": "sdadds",
            // "email": "4krutikparikh@gmail.com",
            // "password": "test1234",
            // "textarea": "asaadasdads",
            // "select": "sveltekit",
            // "multiSelect": [
            //     "next.js",
            //     "sveltekit",
            //     "nuxt.js"
            // ],
            // "combobox": "next.js",
            // "checkbox": true,
            // "calendar": new Date("2016-06-04T04:00:00.000Z"),
            // "radio": "mentions",
            // "switch": false
        }
    })
    const [values, setValues] = useState({})

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setValues(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <InputField
                    control={form.control}
                    label="Text"
                    placeholder="John Doe"
                    name="text"
                    description="Your full name"
                    type="text"
                />
                <InputField
                    control={form.control}
                    label="Email"
                    placeholder="John.doe@example.com"
                    name="email"
                    description="Your email address"
                    type="email"
                />
                <InputField
                    control={form.control}
                    label="Password"
                    placeholder="****"
                    name="password"
                    description="Your password"
                    type="password"
                />
                <TextareaField
                    control={form.control}
                    label="TextArea"
                    placeholder="Tell us a little bit about yourself"
                    name="textarea"
                    description="Your bio"
                />
                <SelectField
                    control={form.control}
                    label="Select"
                    placeholder="Select a verified email to display"
                    name="select"
                    description="Select a verified email to display"
                    options={frameworksList}
                    type="select"
                />
                <SelectField
                    control={form.control}
                    label="Multi select"
                    placeholder="Select options"
                    name="multiSelect"
                    description="Choose the frameworks you are interested in."
                    options={frameworksList}
                    type="multi-select"
                />

                <SelectField
                    control={form.control}
                    label="Search single select"
                    placeholder="Select options"
                    name="combobox"
                    description="Choose the frameworks you are interested in."
                    options={frameworksList}
                    type="search-select"
                />
                <CheckboxField
                    control={form.control}
                    label="Checkbox"
                    name="checkbox"
                    description="Subscribe to our newsletter"
                />
                <DatepickerField
                    control={form.control}
                    label="Date of birth"
                    name="calendar"
                    description="Receive emails about new products, features, and more."
                    placeholder="Pick a date"
                />
                <RadioField
                    control={form.control}
                    label="Radio"
                    name="radio"
                    description="Choose the type of notifications you want to receive."
                    options={[
                        { label: "All new messages", value: "all" },
                        { label: "Direct messages and mentions", value: "mentions" },
                        { label: "Nothing", value: "none" },
                    ]}
                />
                <SwitchField
                    control={form.control}
                    label="Marketing emails"
                    name="switch"
                    description="Receive emails about new products, features, and more."
                />
                <Button type="submit" className="w-full" loading={form?.formState?.isSubmitting}>
                    Try now
                </Button>

                <pre>
                    <code className="">{JSON.stringify(values, null, 2)}</code>
                </pre>
            </form>
        </Form>
    )
}