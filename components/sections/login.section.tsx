import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import { LoginForm } from "../forms/login.form"
import { Button } from "../ui/button"
import { ForgotPasswordDialog } from "../dialogs/forgotPassword.dialog"

export const LoginSection = () => {
    return (
        <Card className="mx-auto min-w-96">
            <CardHeader>
                <CardTitle className="text-xl">Sign in</CardTitle>
                <CardDescription>
                    Enter your information to sign in
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
                <div className="mt-4 text-center text-sm">
                    Forgot your password?{" "}
                    <ForgotPasswordDialog />
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Button variant="link" asChild>
                        <Link href={ROUTES.register}>
                            Sign up
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}