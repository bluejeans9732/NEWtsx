import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

import { User } from '@/util/types'


const {
  GITLOGIN_clientId,
  GITLOGIN_clientSecret,
  SECRETKEY
} = process.env;

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GITLOGIN_clientId!,
      clientSecret: GITLOGIN_clientSecret!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('Missing credentials');
          return null;
        }
        const client = await connectDB();
        const db = client.db('practsx');
        let user = await db.collection<User>('user_cred').findOne({ email: credentials.email });
        if (!user) {
          console.log('There is no such email');
          return null;
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('Wrong password');
          return null;
        }
        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any, user: any }) => {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image // 필요에 따라 추가
        };
      }
      return token;
    },
    session: async ({ session, token }: { session: any, token: any }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: SECRETKEY,
  adapter: MongoDBAdapter(connectDB()),
};

export default NextAuth(authOptions);
