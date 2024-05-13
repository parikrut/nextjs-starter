import { IPermissions, IResponse } from "@/types/common";
import { auth } from "./auth";
import { GetUserPermissions } from "@/server/authorization.api";

export const withErrorHandling = <T>(handler: (...args: any[]) => Promise<IResponse<T>>) => {
    return async (...args: Parameters<typeof handler>): Promise<IResponse<T>> => {
        try {
            return await handler(...args);
        } catch (error) {
            console.error("Error occurred:", error);
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
    };
};

export const withAuthorization = <T>(permission: IPermissions, handler: (...args: any[]) => Promise<IResponse<T>>) => {
    return async (...args: Parameters<typeof handler>): Promise<IResponse<T>> => {
        try {
            const session = await auth();
            if (!session?.user) {
                return {
                    success: false,
                    message: "Unauthorized"
                };
            }

            await GetUserPermissions(session.user.email, permission);

            return await handler(...args);
        } catch (error) {
            console.error("Error occurred:", error);
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
    };
};