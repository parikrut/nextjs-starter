import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { authConfig } from "./auth.config"
import { GetUserByEmail } from '@/server/user.api';
import { User } from '@prisma/client';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize({ email, password }: any) {
                const user = await GetUserByEmail(email);
                if (!user.success) return null;
                let passwordsMatch = await compare(password, user.data.password!);
                if (passwordsMatch) return user.data as any;
            },
        }),
    ],
});
