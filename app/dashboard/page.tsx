import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Notification } from "@/components/ui/notification";
import { auth } from "@/lib/auth";
import { Permissions, Roles } from "@/lib/authorization";
import { ROUTES } from "@/lib/routes";
import { GetUserPermissions } from "@/server/authorization.api";
import { IPermissions } from "@/types/common";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await auth();
    const permission = session?.user && await GetUserPermissions(session.user.email, Permissions.GET_USER as IPermissions);

    if (!permission) {
        return <Notification variant="destructive">
            Something went wrong
        </Notification>
    }
    if (!permission.success) {
        return <Notification variant="destructive" >
            {permission.message}
        </Notification>
    }

    if (permission.data.Role.name === Roles.ADMIN) {
        return redirect(ROUTES.admin.dashboard)
    }

    if (permission.data.Role.name === Roles.USER) {
        return redirect(ROUTES.user.dashboard)
    }
}
