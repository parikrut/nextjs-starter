import NextAuth from 'next-auth';
import * as authConfig from './lib/auth';

export { auth as middleware } from "@/lib/auth"

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
