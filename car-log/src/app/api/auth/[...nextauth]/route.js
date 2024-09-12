import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { userFindById } from "../../user";
import bcrypt from "bcrypt";

const handler = NextAuth({
  pages: {
    signIn: "/users/login",
    signOut: "/users/logout",
  },
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(loginUser) {
        const { username, password } = loginUser;

        const user = await userFindById(username);

        if (user.username !== username) return null;

        const bYes = await bcrypt.compare(password, user.password);

        if (!bYes) return null;

        return { ...user, password: undefined };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Ensure user object has necessary fields
      if (user) {
        session.user = {
          id: user.id,
          username: user.username,
          realname: user.realname,
        };
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 60,
  },
});

export { handler as GET, handler as POST };
