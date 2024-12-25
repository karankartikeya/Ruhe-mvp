import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import isEqual from "lodash/isEqual";

export const authoption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/authentication/login",
    signOut: "/authentication/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {    
        const user = {
          email: "Test123@gmail.com",
          password: "Test@123",
        };
        if (
          isEqual(user, {
            email: credentials?.email,
            password: credentials?.password,
          })
        ) {
          return user as any;
        }
        return null;
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },        
    async redirect({ url, baseUrl }) {
      // Allow relative URLs (like "/newsfeed/style1")
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allow external URLs (ensure they match the base URL)
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Default to baseUrl if any issue
      return baseUrl;
    },
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // }
  },
  debug:true
  
};
