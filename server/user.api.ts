"use server"
import { signIn, signOut } from '@/lib/auth';
import { Permissions, Roles } from '@/lib/authorization';
import { prisma } from '@/lib/db';
import { withAuthorization } from '@/lib/helper';
import { ROUTES } from '@/lib/routes';
import { GetAllParams, IPermissions, IResponse } from '@/types/common';
import { Prisma, User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Do now wrap this function with withErrorHandling or add a try catch block
export const SignOut = async () => {
    await signOut({
        redirectTo: ROUTES.login
    });
}

// Do now wrap this function with withErrorHandling
export const SignIn = async (data: Pick<User, | "email" | "password">): Promise<IResponse<null>> => {
    try {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        return {
            success: true,
            data: null
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to sign in"
        }
    }
}

export const CreateUser = async (data: Pick<User, "name" | "email" | "password">): Promise<IResponse<User>> => {
    try {
        const { name, email, password } = data;
        let salt = genSaltSync(10);
        let hash = hashSync(password, salt);

        const userExists = await GetUserByEmail(email);
        if (userExists.success) {
            throw new Error("User already exists");
        }

        let user = await prisma.$transaction(
            async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        name,
                        email: email.toLowerCase(),
                        password: hash
                    }
                });
                await prisma.userRole.create({
                    data: {
                        User: {
                            connect: {
                                id: user.id
                            }
                        },
                        Role: {
                            connect: {
                                name: Roles.ADMIN // Roles.ADMIN
                            }
                        }
                    }
                });

                return user;
            }
        )

        return {
            success: true,
            data: user
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}


export const UpdateUser = async (id: number, data: Partial<User>): Promise<IResponse<User>> => {
    try {
        if (data.password) {
            let salt = genSaltSync(10);
            data.password = hashSync(data.password, salt);
        }
        let user = await prisma.user.update({
            where: {
                id
            },
            data
        });

        return {
            success: true,
            data: user
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}


export const GetUserByEmail = async (email: string): Promise<IResponse<User>> => {

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            data: user
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}

export const GetUserById = async (id: string): Promise<IResponse<User>> => {
    try {
        // Remove this line when you add the actual implementation
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            data: user
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}

export const GetUserByUniqueId = async (uniqueId: string): Promise<IResponse<User>> => {
    try {
        // Remove this line when you add the actual implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        const user = await prisma.user.findUnique({
            where: {
                uniqueId
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            data: user
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}

export const GetAllUsers = async ({ page = 1, limit = 10, query, sort }: GetAllParams): Promise<IResponse<User[]>> => {
    try {
        // await withAuthorization(Permissions.GET_ALL_USERS as IPermissions);

        const queryOption: Prisma.UserWhereInput = {
            OR: [
                {
                    name: {
                        contains: query ?? "",
                    },
                },
                {
                    email: {
                        contains: query ?? "",
                    }
                }
            ],
        }

        const users = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                ...(Object.keys(sort || {}).length === 0 ? { sortOrder: 'desc' } : sort)
            },
            where: queryOption
        });

        const count = await prisma.user.count({
            where: queryOption
        });

        return {
            success: true,
            data: users,
            pages: Math.ceil(count / limit)
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}

export const UpdateManyUsers = async (users: User[]): Promise<IResponse<null>> => {
    try {
        await prisma.$transaction(
            users.map(user => prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    ...user
                }
            }))
        );
        return {
            success: true,
            data: null
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}

export const SortUsers = async (user: User, position: number): Promise<IResponse<null>> => {
    try {
        const currentSortOrder = user.sortOrder;
        const users = await prisma.user.findMany({
            where: {
                sortOrder: {
                    gte: Math.min(currentSortOrder, position),
                    lte: Math.max(currentSortOrder, position)
                }
            }
        });

        await prisma.$transaction(
            users.map(user => prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    sortOrder: user.sortOrder + (currentSortOrder > position ? 1 : -1)
                }
            }))
        );

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                sortOrder: position
            }
        });

        return {
            success: true,
            data: null
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error?.message ?? "An error occurred while processing your request."
            };
        }
        return {
            success: false,
            message: "An error occurred while processing your request."
        };
    }
}