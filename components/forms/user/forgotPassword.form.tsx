"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { CreateUser, SignIn } from "@/server/user.api"
import { useToast } from "../../ui/use-toast"
import { ROUTES } from "@/lib/routes"
import { signIn } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { ResetPasswordEmail } from "@/server/email.api"
import { InputField } from "../../fields/input.field"

const formSchema = z.object({
    email: z.coerce.string().email(),
})

export const ForgotPasswordForm = () => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await ResetPasswordEmail(values)
        if (response.success) {
            toast({
                title: "Sucessfully sent reset password email",
                variant: "success"
            });
            router.push(`${ROUTES.resetPassword}?query=${response?.data?.uniqueId}`)
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
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="John.doe@example.com"
                />
                <Button type="submit" className="w-full" loading={form?.formState?.isSubmitting}>
                    Send Link
                </Button>
            </form>
        </Form>
    )
}