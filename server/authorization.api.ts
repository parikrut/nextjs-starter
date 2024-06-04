"use server"

import { prisma } from "@/lib/db";
import { IPermissions, IResponse } from "@/types/common";
import { User } from "lucide-react";

export const GetUserPermissions = async (email: string, permissionName: IPermissions): Promise<IResponse<any>> => {
    try {
        const user = await prisma.userRole.findFirst({
            where: {
                AND: [
                    {
                        User: {
                            email
                        }
                    },
                    {
                        Role: {
                            RolePermission: {
                                some: {
                                    Permission: {
                                        name: permissionName
                                    }
                                }
                            }
                        }
                    }
                ]
            },
        });

        if (!user) {
            throw new Error("User does not have permission to perform this action.");
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
