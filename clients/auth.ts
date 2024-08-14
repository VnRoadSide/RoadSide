import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInUser } from "./lib/auth";

const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = [
  "/",
  "/login",
  "/register"
]; // The whitelisted routes

const config: NextAuthConfig = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        credential: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const result = await signInUser({
          credential: credentials?.credential as string,
          password: credentials?.password as string
        });

        return result;
      }
    })
  ],
  callbacks: {
    async jwt({ user, token }) {
      //   update token from user
      if (user) {
        token.accessToken = user.accessToken;
      }
      //   return final_token
      return token;
    },
    async session({ session: userSession, token, }) {
      // update session from token
      userSession.accessToken = token.accessToken as string;
      return userSession;
    },
    authorized: ({ request }) => {
      const { pathname } = request.nextUrl;

      // Important! The below only checks if there exists a token. The token is not validated! This means
      // unauthenticated users can set a next-auth.session-token cookie and appear authorized to this
      // middleware. This is not a big deal because we do validate this cookie in the backend and load
      // data based off of its value. This middleware simply redirects unauthenticated users to the login
      // page (and sets a callbackUrl) for all routes, except static files, api routes, Next.js internals,
      // and the whitelisted anonymousRoutes above.
      return Boolean(
        request.cookies.get("next-auth.session-token") || // check if there's a token
          pathname.startsWith("/_next") || // exclude Next.js internals
          pathname.startsWith("/api") || //  exclude all API routes
          pathname.startsWith("/static") || // exclude static files
          publicFileRegex.test(pathname) || // exclude all files in the public folder
          anonymousRoutes.includes(pathname)
      );
    },
  },
  // If you have custom pages like I do, these should be whitelisted!
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
