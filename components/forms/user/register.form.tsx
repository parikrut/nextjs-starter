"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { CreateUser } from "@/server/user.api"
import { useToast } from "../../ui/use-toast"
import { ROUTES } from "@/lib/routes"
import { redirect, useRouter } from "next/navigation"
import { InputField } from "../../fields/input.field"

const formSchema = z.object({
    name: z.coerce.string().min(2).max(50),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(8),
})
export const RegisterForm = () => {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await CreateUser(values);
        if (response.success) {
            toast({
                title: "Account created",
                description: "You can now sign in",
                variant: "success"
            });
            router.push(ROUTES.login);
        }
        else {
            toast({
                title: response.message,
                variant: "destructive"
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <InputField
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="John Doe"
                    type="text"
                />
                <InputField
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="John.doe@example.com"
                />
                <InputField
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="****"
                />
                <Button type="submit" className="w-full" loading={form?.formState?.isSubmitting}>
                    Create an account
                </Button>
            </form>
        </Form>
    )
}