import { UniversalForm } from "@/components/forms/universal.form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
    return <Card className="mx-auto min-w-96">
        <CardHeader>
            <CardTitle className="text-xl">Universal form</CardTitle>
            <CardDescription>
                This is a universal form with all the fields required to build a form
            </CardDescription>
        </CardHeader>
        <CardContent>
            <UniversalForm />
        </CardContent>
    </Card>
}
