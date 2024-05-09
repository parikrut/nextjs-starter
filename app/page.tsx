import { RegisterSection } from "@/components/sections/register.section";
import { z } from "zod"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col justify-center">
      <RegisterSection />
    </main>
  )
}
