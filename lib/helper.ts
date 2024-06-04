"use server"
import { IPermissions, IResponse } from "@/types/common";
import { auth } from "./auth";
import { GetUserPermissions } from "@/server/authorization.api";
import { prisma } from "./db";

// Always wrap this functions with try catch block
export const withAuthorization = async (permission: IPermissions): Promise<IResponse<any>> => {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }

    const user = await prisma.userRole.findFirst({
        where: {
            AND: [
                {
                    User: {
                        email: session.user.email
                    }
                },
                {
                    Role: {
                        RolePermission: {
                            some: {
                                Permission: {
                                    name: permission
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
};