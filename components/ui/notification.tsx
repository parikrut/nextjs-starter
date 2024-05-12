import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircle, CircleCheck, Info } from "lucide-react";

export const Notification = async ({ variant, children }: { variant: 'destructive' | 'success' | 'info', children: React.ReactNode }) => {
    let Icon;
    let title;

    switch (variant) {
        case 'destructive':
            Icon = AlertCircle;
            title = 'Error';
            break;
        case 'success':
            Icon = CircleCheck;
            title = 'Success';
            break;
        case 'info':
            Icon = Info;
            title = 'Info';
            break;
        default:
            Icon = null;
            title = '';
    }

    return (
        <Alert variant={variant}>
            {Icon && <Icon className="h-4 w-4" />}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {children}
            </AlertDescription>
        </Alert>
    )
}
