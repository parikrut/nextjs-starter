type SuccessResponse<Type> = {
    success: true;
    data: Type;
};

type ErrorResponse = {
    success: false;
    message: string;
};

export type IResponse<Type> = SuccessResponse<Type> | ErrorResponse;