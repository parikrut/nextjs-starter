import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ForgotPasswordForm } from "../forms/forgotPassword.form"

export const ForgotPasswordDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">Reset it here</Button>
            </DialogTrigger>
            <DialogContent className="w-96">
                <DialogHeader>
                    <DialogTitle>Forgot your password?</DialogTitle>
                    <DialogDescription>
                        Enter your email address and we&apos;ll send you a link to reset your password
                    </DialogDescription>
                    <DialogDescription>
                        <ForgotPasswordForm />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}