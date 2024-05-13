export const Permissions = {
    GET_USER: "GET_USER",
    CREATE_USERS: "CREATE_USERS",
    UPDATE_USERS: "UPDATE_USERS",
    DELETE_USERS: "DELETE_USERS",
    GET_ALL_USERS: "GET_ALL_USERS",
}

export const Roles = {
    ADMIN: "ADMIN",
    USER: "USER"
}

export const RoleBasedPermissions = {
    [Roles.ADMIN]: [
        Permissions.GET_USER,
        Permissions.CREATE_USERS,
        Permissions.UPDATE_USERS,
        Permissions.DELETE_USERS,
        Permissions.GET_ALL_USERS,
    ],
    [Roles.USER]: [
        Permissions.GET_USER,
    ],
}