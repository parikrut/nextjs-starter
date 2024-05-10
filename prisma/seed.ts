// import { PrismaClient } from "@prisma/client";
// import { faker } from '@faker-js/faker';
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function seed() {
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

seed()
    .catch((e) => {
        console.error("Seeding failed!", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });