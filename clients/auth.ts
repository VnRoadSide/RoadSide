import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInUser, signOutUser, signUpUser } from "./lib/auth";
import { NextApiRequest } from "next";

const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = [
  "/",
  "/login",
  "/signup",
  "/reset-password",
  "/logout"
]; // The whitelisted routes

const isRegistration = (req: NextApiRequest): boolean => {
  if (
    req.query.nextauth &&
    req.query.nextauth.length === 2 &&
    req.query.nextauth[0] === 'signin' &&
    req.query.nextauth[1] === 'email'
  ) {
    return req.query.signin_type === 'registration'
  }
  return false
}

const config: NextAuthConfig = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        actionType: { label: "Action Type", type: "hidden" } // Include this to differentiate sign-in and sign-up
      },
      authorize: async (credentials) => {
        if (credentials?.actionType === "signup") {
          // Call your sign-up API function
          const result = await signUpUser({
            email: credentials?.email as string,
            password: credentials?.password as string
          });
          return result;
        } else {
          // Call your sign-in API function
          const result = await signInUser({
            email: credentials?.email as string,
            password: credentials?.password as string
          });
          return result;
        }
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
    newUser: "/signup",
    signOut: "/logout",
  },
  events: {
    signOut: () => {
      // Additional post processing after signout and the session is cleared...
      signOutUser();
    }
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
