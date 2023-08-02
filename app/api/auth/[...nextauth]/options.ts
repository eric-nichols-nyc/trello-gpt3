// import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/db/database';
import User from '@/models/User';

interface Profile {
  profile: {
    name: String;
    email: String;
    picture: String;
  };
}
export const options = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
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
    async session({ session }: any): Promise<any> {
      return session;
    },
    async signIn({ profile }: Profile): Promise<boolean> {
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
          // console.log('User = ', user);
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
