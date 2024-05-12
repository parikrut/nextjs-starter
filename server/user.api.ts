"use server"
import { signIn, signOut } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { withErrorHandling } from '@/lib/helper';
import { ROUTES } from '@/lib/routes';
import { GetAllParams, IResponse } from '@/types/common';
import { User } from '@prisma/client';
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

export const CreateUser = withErrorHandling(
    async (data: Pick<User, "name" | "email" | "password">): Promise<IResponse<User>> => {
        const { name, email, password } = data;
        let salt = genSaltSync(10);
        let hash = hashSync(password, salt);

        const userExists = await GetUserByEmail(email);
        if (userExists.success) {
            throw new Error("User already exists");
        }

        let user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash
            }
        });

        return {
            success: true,
            data: user
        }
    }
)

export const UpdateUser = withErrorHandling(
    async (id: number, data: Partial<User>): Promise<IResponse<User>> => {
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
    }
)

export const GetUserByEmail = withErrorHandling(
    async (email: string): Promise<IResponse<User>> => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            data: user
        }
    })

export const GetUserById = withErrorHandling(
    async (id: string): Promise<IResponse<User>> => {
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
    })

export const GetUserByUniqueId = withErrorHandling(
    async (uniqueId: string): Promise<IResponse<User>> => {
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
    })

export const GetAllUsers = withErrorHandling(
    async ({ page = 1, limit = 10 }: GetAllParams): Promise<IResponse<User[]>> => {
        // Remove this line when you add the actual implementation
        await new Promise(resolve => setTimeout(resolve, 1000));

        const users = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const count = await prisma.user.count();

        return {
            success: true,
            data: users,
            pages: Math.ceil(count / limit)
        }
    })