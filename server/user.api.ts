"use server"
import { signIn, signOut } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { ROUTES } from '@/lib/routes';
import { GetAllParams, IResponse } from '@/types/common';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export const SignOut = async () => {
    await signOut({
        redirectTo: ROUTES.login
    });
}

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
    const { name, email, password } = data;
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);

    const userExists = await GetUserByEmail(email);
    if (userExists.success) {
        return {
            success: false,
            message: "User already exists"
        }
    }

    try {
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
    catch (err) {
        return {
            success: false,
            message: "Failed to create user"
        }
    }
}

export const UpdateUser = async (id: number, data: Partial<User>): Promise<IResponse<User>> => {
    try {
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
    catch (err) {
        return {
            success: false,
            message: "Failed to update user"
        }
    }
}

export const GetUserByEmail = async (email: string): Promise<IResponse<User>> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        return {
            success: true,
            data: user
        }
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Failed to get user"
        }
    }
}

export const GetUserById = async (id: string): Promise<IResponse<User>> => {
    // Remove this line when you add the actual implementation
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        return {
            success: true,
            data: user
        }
    }
    catch (err) {
        return {
            success: false,
            message: "Failed to get user"
        }
    }
}

export const GetUserByUniqueId = async (uniqueId: string): Promise<IResponse<User>> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                uniqueId
            }
        });

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        return {
            success: true,
            data: user
        }
    }
    catch (err) {
        return {
            success: false,
            message: "Failed to get user"
        }
    }
}

export const GetAllUsers = async ({ page = 1, limit = 10 }: GetAllParams): Promise<IResponse<User[]>> => {
    // Remove this line when you add the actual implementation
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
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
    }
    catch (err) {
        return {
            success: false,
            message: "Failed to get users"
        }
    }
}