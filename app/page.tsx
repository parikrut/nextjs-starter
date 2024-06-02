import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div className="flex flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href={ROUTES.login}>
            Login
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={ROUTES.dashboard}>
            Dashboard
          </Link>
        </Button>
        <Button asChild variant="default">
          <Link href={ROUTES.register}>
            Register
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={ROUTES.universalForm}>
            Unviversal form
          </Link>
        </Button>
        <Button asChild variant="default">
          <Link href={ROUTES.filters}>
            Filters
          </Link>
        </Button>
      </div>
    </main>
  )
}
