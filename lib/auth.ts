import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { GetUserByEmail } from '@/server/user.api';
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
    trustHost: true,
    session: { strategy: 'jwt' },
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
                if (nextUrl.pathname === ROUTES.resetPassword) {
                    return true;
                }
                return Response.redirect(new URL(ROUTES.dashboard, nextUrl));
            }

            return true;
        },
    },
});
