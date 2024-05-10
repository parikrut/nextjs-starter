import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { GetUserByEmail } from '@/server/user.api';
import { User } from '@prisma/client';
import { ROUTES } from './routes';

export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: ROUTES.login,
        newUser: ROUTES.register,
    },
    providers: [
        Credentials({
            async authorize({ email, password }: any) {
                const user = await GetUserByEmail(email);
                if (!user.success) return null;
                const passwordsMatch = await compare(password, user.data.password!);
                if (passwordsMatch) {
                    return user.data as any;
                }
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith(ROUTES.dashboard);

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL(ROUTES.dashboard, nextUrl));
            }

            return true;
        },
        async session({ session }: { session: any }) {
            const user = await GetUserByEmail(session.user.email);

            if (!user.success) {
                throw new Error("User not found");
            }

            session.user = user.data as User;
            return session;
        },
    },
});
