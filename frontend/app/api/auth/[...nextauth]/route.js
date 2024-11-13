import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Make a request to your backend to authenticate the user
          const response = await axios.post(
            "http://localhost:5000/api/v1/auth/login/local",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.data && response.data.user) {
            return response.data.user;
          }
          return null;
        } catch (error) {
          console.error("Error authenticating:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/", //  sign-in page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      session.name = token.name;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
