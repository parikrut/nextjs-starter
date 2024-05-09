"use server"
import { prisma } from '@/lib/db';
import { IResponse } from '@/types/common';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export const CreateUser = async (data: Pick<User, "first_name" | "last_name" | "email" | "password">): Promise<IResponse<User>> => {
    const { first_name, last_name, email, password } = data;
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
                first_name,
                last_name,
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

export const GetUserByEmail = async (email: string): Promise<IResponse<User>> => {
    try {
        let user = await prisma.user.findUnique({
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
        return {
            success: false,
            message: "Failed to get user"
        }
    }
}