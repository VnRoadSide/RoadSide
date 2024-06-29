import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { useApi } from "./utils";
import { Authorization, UserLogin } from "./models/users";

const config: NextAuthConfig = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { post } = useApi();

        // ToDo: Authentication logic
        const { data: user, error } = await post<Authorization>("/auth/login", {
          username: credentials?.username,
          password: credentials?.password,
        } as UserLogin);

        // return user object with the their profile data
        if (!error) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
