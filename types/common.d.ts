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

export interface GetAllParams {
    page?: number = 1;
    limit?: number = 10;
}