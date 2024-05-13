import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const SeedUsers = async (prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const numUsers = 20; // Adjust this value to create more users

    for (let i = 0; i < numUsers; i++) {
        const name = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password()
        try {
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });
            console.log(`User ${i + 1} created successfully!`);
        } catch (error) {
            console.error(`Error creating user ${i + 1}:`, error);
        }
    }

    console.log(`${numUsers} users created in total.`);
}
