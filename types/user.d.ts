export interface IUser {
    id: number;
    uniqueId: string;
    name: string;
    email: string;
    password: string;
    resetCode: string | null;
    emailVerified: boolean;
    createdAt: Date;
    UserRole: {
        id: number,
        userId: number,
        roleId: number,
        createdAt: Date
        Role: {
            id: number,
            name: IRoles,
            description: string | null,
            createdAt: Date,
            RolePermission: {
                id: number,
                roleId: number,
                permissionId: number,
                createdAt: Date,
                Permission: {
                    id: number,
                    name: IPermissions,
                    description: string | null,
                    createdAt: Date
                }
            }[]
        }
    }[]
}