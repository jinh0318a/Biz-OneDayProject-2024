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

        // 사용자 찾기
        const user = await userFindById(username);

        if (!user) {
          // 사용자가 존재하지 않으면 인증 실패
          return null;
        }

        // 사용자명 비교
        if (user.username !== username) {
          return null;
        }

        // 비밀번호 비교
        const bYes = await bcrypt.compare(password, user.password);
        if (!bYes) {
          return null;
        }

        return {
          username: user.username,
          realname: user.realname,
          email: user.email,
          // 비밀번호는 포함하지 않음
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = {
          username: user.username,
          realname: user.realname,
          email: user.email,
        };
      } else {
        // If user is not available, you might want to handle this case.
        console.log("No user data in session callback");
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 60,
  },
});

export { handler as GET, handler as POST };
