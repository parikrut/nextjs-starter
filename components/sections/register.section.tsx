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
import { Button } from "../ui/button"

export const RegisterSection = () => {
    return (
        <Card className="mx-auto min-w-96">
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
                    <Button variant="link" asChild>
                        <Link href={ROUTES.login}>
                            Sign in
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}