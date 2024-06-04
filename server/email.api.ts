"use server"

import { IResponse } from "@/types/common"
import { User } from "@prisma/client"
import { customAlphabet } from 'nanoid'
import { ROUTES } from "@/lib/routes"
import { prisma } from '@/lib/db';
import { Resend } from 'resend';
import ResetPasswordEmailTemplate from "@/emails/emails/reset-password"

const nanoid = customAlphabet('1234567890', 6)
const resend = new Resend(process.env.RESEND_API_KEY);

export const ResetPasswordEmail = async (data: Pick<User, | "email">): Promise<IResponse<User>> => {
    try {
        const { email } = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error("User not found")
        }

        const token = nanoid(6)

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                resetCode: token
            }
        });

        const link = `${process.env.VERCEL_URL}/${ROUTES.resetPassword}?query=${user?.uniqueId}`;

        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL as string,
            to: user.email,
            subject: 'Reset your password',
            react: ResetPasswordEmailTemplate({ name: user.name, link }),
        });

        if (error) {
            throw new Error("Failed to send reset password email")
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