import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await res.json();

        if (res.ok && data?.user) {
          // Any object returned will be saved in `user` property of the JWT
          return data.user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    },
    ),
  ],
  jwt: {
    // 1 day
    maxAge
      : 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // TODO: Fix this type issue
      session.user = token as unknown as typeof session.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
})
