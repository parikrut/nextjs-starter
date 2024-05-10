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
                    <Link href={ROUTES.forgotPassword} className="underline">
                        Reset it here
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}