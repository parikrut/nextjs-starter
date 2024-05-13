import { Permissions, RoleBasedPermissions, Roles } from "@/lib/authorization";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const SeedPermissions = async (prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const permissions = Object.values(Permissions);

    for (let i = 0; i < permissions.length; i++) {
        const permission = permissions[i];
        try {
            await prisma.permission.upsert({
                update: {
                    name: permission,
                },
                create: {
                    name: permission,
                },
                where: {
                    name: permission,
                },
            });
            console.log(`Permission ${i + 1} created successfully!`);
        } catch (error) {
            console.error(`Error creating permission ${i + 1}:`, error);
        }
    }

    console.log(`${permissions.length} permissions created in total.`);
}

export const SeedRoles = async (prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const roles = Object.values(Roles);

    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        try {
            await prisma.role.upsert({
                update: {
                    name: role,
                },
                create: {
                    name: role,
                },
                where: {
                    name: role,
                },
            });
            console.log(`Role ${i + 1} created successfully!`);
        } catch (error) {
            console.error(`Error creating role ${i + 1}:`, error);
        }
    }
}

export const SeedRolePermissions = async (prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {

    for (let role in RoleBasedPermissions) {
        for (let permission in RoleBasedPermissions[role]) {
            try {
                const findRolePermissionId = await prisma.rolePermission.findFirst({
                    where: {
                        Role: {
                            name: role
                        },
                        Permission: {
                            name: RoleBasedPermissions[role][permission]
                        }
                    }
                });

                if (findRolePermissionId) {
                    console.log(`Role ${role} and Permission ${RoleBasedPermissions[role][permission]} already exists!`);
                    continue;
                } else {
                    await prisma.rolePermission.create({
                        data: {
                            Permission: {
                                connect: {
                                    name: RoleBasedPermissions[role][permission]
                                }
                            },
                            Role: {
                                connect: {
                                    name: role
                                }
                            }
                        }
                    })

                    console.log(`Role ${role} and Permission ${RoleBasedPermissions[role][permission]} created successfully!`)
                }
            } catch (error) {
                console.error(`Error creating role ${role} and permission ${RoleBasedPermissions[role][permission]}:`, error);
            }
        }
    }
}