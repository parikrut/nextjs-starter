import { DashboardIcon } from "@radix-ui/react-icons";
import { ROUTES } from "./routes";
import { Roles } from "./authorization";

export const ROUTE_LINKS: {
    title: string;
    icon: any;
    link: string;
    type: string
}[]
    = [
        {
            title: "Dashboard",
            icon: DashboardIcon,
            link: ROUTES.admin.dashboard,
            type: Roles.ADMIN
        },
        {
            title: "Dashboard",
            icon: DashboardIcon,
            link: ROUTES.user.dashboard,
            type: Roles.USER
        },
    ]