import { NextAuthConfig } from 'next-auth';
import { ROUTES } from './routes';

export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    providers: [
        // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
        // while this file is also used in non-Node.js environments
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            let isLoggedIn = !!auth?.user;
            let isOnDashboard = nextUrl.pathname.startsWith(ROUTES.dashboard);

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL(ROUTES.dashboard, nextUrl));
            }

            return true;
        },
    },
} satisfies NextAuthConfig;
