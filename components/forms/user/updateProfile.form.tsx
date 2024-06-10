"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../ui/form"
import { UpdateUser } from "@/server/user.api"
import { useToast } from "../../ui/use-toast"
import { ROUTES } from "@/lib/routes"
import { signIn } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { InputField } from "../../fields/input.field"
import { User } from "@prisma/client"
import { ForgotPasswordDialog } from "@/components/dialogs/forgotPassword.dialog"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
    email: z.coerce.string().email(),
    name: z.coerce.string().min(2).max(50),
})
export const UpdateProfileForm = ({ user }: { user: User }) => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...user
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await UpdateUser(user.id, values)
        if (response.success) {
            toast({
                title: "Sucessfully updated profile",
                variant: "success"
            });
            router.refresh()
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
                    disabled
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="John.doe@example.com"
                />
                <div className="flex flex-row items-center justify-between">
                    <Label>
                        Forgot your password?{" "}
                        <ForgotPasswordDialog />
                    </Label>
                    <Button type="submit" loading={form?.formState?.isSubmitting}>
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    )
}