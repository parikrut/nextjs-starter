import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { GetUserByEmail } from '@/server/user.api';
import { User } from '@prisma/client';
import { ROUTES } from './routes';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '@/lib/db';

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
    session: { strategy: 'jwt' },
    // adapter: PrismaAdapter(prisma),
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
        // async jwt({ token }) {
        //     console.log({
        //         token
        //     })
        //     const user = token?.email && await GetUserByEmail(token.email);
        //     token.user = user && user?.success && user?.data as User;
        //     return token;
        // },
        async session({ session, token }) {
            // if (session?.user) {
            //     if (token?.user) {
            //         session.user = { ...session?.user, ...token.user };
            //     }
            // }
            return session;
        },
    },
});
