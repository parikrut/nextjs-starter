import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { RegisterForm } from "../forms/register.form"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"

export const RegisterSection = () => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href={ROUTES.login} className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}