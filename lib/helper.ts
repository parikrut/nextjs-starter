import { IResponse } from "@/types/common";

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