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
          // Make a request to backend to authenticate the user
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login/local`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          if (
            response.data &&
            response.data.user &&
            response.data.accessToken
          ) {
            // Return the user along with the accessToken
            return {
              ...response.data.user,
              accessToken: response.data.accessToken,
            };
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          console.error("Error authenticating:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/", // sign-in page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // Store the accessToken in the token if it exists
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token data to session object
      session.id = token.id;
      session.email = token.email;
      session.name = token.name;
      session.accessToken = token.accessToken; // Make sure to add accessToken here
      return session;
    },
  },
});

export { handler as GET, handler as POST };
