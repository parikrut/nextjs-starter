import { Permissions, Roles } from "@/lib/authorization";

type SuccessResponse<Type> = {
    success: true;
    data: Type;
    pages?: number;
};

type ErrorResponse = {
    success: false;
    message: string;
};

export type IResponse<Type> = SuccessResponse<Type> | ErrorResponse;

export interface GetAllParams<Type> {
    page?: number = 1;
    limit?: number = 10;
    search?: Record<Type | undefined, string | undefined>
}

export interface SearchParamsProps {
    searchParams?: {
        page?: string;
        query?: string;
        limit?: string;
    };
}

export interface IdParamsProps {
    params: {
        id: string;
    };
}

export type IPermissions = keyof typeof Permissions;
export type IRoles = keyof typeof Roles;
