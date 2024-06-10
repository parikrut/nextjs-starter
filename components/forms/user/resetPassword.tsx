"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { CreateUser, SignIn, UpdateUser } from "@/server/user.api"
import { useToast } from "../../ui/use-toast"
import { ROUTES } from "@/lib/routes"
import { signIn } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { ResetPasswordEmail } from "@/server/email.api"
import { User } from "@prisma/client"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../ui/input-otp"
import { InputField } from "../../fields/input.field"

const formSchema = z.object({
    resetCode: z.coerce.string().min(6),
    password: z.coerce.string().min(8),
})

export const ResetPasswordForm = (user: User) => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (user.resetCode !== values.resetCode) {
            toast({
                title: "Invalid reset code",
                variant: "destructive"
            })
            return
        }
        const response = await UpdateUser(user.id, { password: values.password })
        if (response.success) {
            toast({
                title: "Sucessfully sent reset password email",
                variant: "success"
            });
            router.push(ROUTES.login)
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
                <FormField
                    control={form.control}
                    name="resetCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <InputField
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="****"
                />
                <Button type="submit" className="w-full" loading={form?.formState?.isSubmitting}>
                    Reset Password
                </Button>
            </form>
        </Form>
    )
}