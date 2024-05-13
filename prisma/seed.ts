import { PrismaClient } from "@prisma/client";
import { SeedUsers } from "./seed/users.seed";
import { SeedPermissions, SeedRolePermissions, SeedRoles } from "./seed/authorization.seed";
const prisma = new PrismaClient();

async function seed() {
    await SeedUsers(prisma);
    await SeedPermissions(prisma);
    await SeedRoles(prisma);
    await SeedRolePermissions(prisma);
    return
}

seed()
    .catch((e) => {
        console.error("Seeding failed!", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });