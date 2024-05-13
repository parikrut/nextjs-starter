import { IUser } from "./types/user";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: IUser | null;
        expires: string | null;
    }
}
