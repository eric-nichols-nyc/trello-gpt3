import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/db/database';
import clientPromise from './client';
import User from '@/models/User';

import { MongoDBAdapter } from '@auth/mongodb-adapter';


declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

export const authOptions: any = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username:',
    //       type: 'text',
    //       placeholder: 'Eric',
    //     },
    //     password: {
    //       label: 'Password:',
    //       type: 'password',
    //       placeholder: 'nextauth',
    //     },
    //   },
    //   async authorize(credentials) {
    //     // This is where you need to retrieve user data
    //     // to verify with credentials
    //     // Docs: https://next-auth.js.org/configuration/providers/credentials
    //     const user = { id: '42', name: 'Eric', password: 'nextauth' };

    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ profile }: any): Promise<boolean> {
      try {
        connectDB();
        // look for user email in db
        const userExists = await User.findOne({ email: profile.email });
        // if no user create one
        if (!userExists) {
          const user = await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async session({ session, token }:any) {
      // console.log('token = ', token);
        if (session) {
          session = Object.assign({}, session, {
            user: token,
            access_token: token.access_token,
          });
          // console.log(session);
        }
        return session;
    },
    async jwt({ token, account, user }: any) {
          if (account) {
            token = Object.assign({}, token, {
              access_token: account.access_token,
            });
          }
      return { ...token, ...user };
    },
  },
  pages: {
    signIn: '/auth/signin',
  }
};

// get user credentials in server side components
export const getAuthSession = () => getServerSession(authOptions);
export default NextAuth(authOptions);
