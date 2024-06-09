"use client"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { SignOut } from "@/server/user.api"

export const LogoutForm = ({
    isCollapsed
}: {
    isCollapsed: boolean
}) => {
    const form = useForm()

    const onSubmit = async () => {
        await SignOut()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Button type="submit" className="w-full justify-start" variant="ghost" loading={form?.formState?.isSubmitting}>
                    <LogOut className="mr-2 h-6 w-6" />{isCollapsed ? "" : "Log out"}
                </Button>
            </form>
        </Form>
    )
}