import { Layout } from "@/components/layouts";
import { DashboardSidebar } from "@/components/sidebar/dashboard.sidebar";
import { Separator } from "@/components/ui/separator"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}