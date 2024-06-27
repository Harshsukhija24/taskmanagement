// Import necessary modules
import User from "../../../models/User"; // Adjust path as per your project structure
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "../../../lib/connectdb";
import bcrypt from "bcryptjs";

// Configure authentication options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDb(); // Connect to MongoDB
          const user = await User.findOne({ email });

          if (!user) {
            return null; // User not found
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null; // Password doesn't match
          }

          // Return user object if authentication succeeds
          return user;
        } catch (error) {
          console.error("Error:", error);
          return null; // Return null in case of any errors
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Include necessary user data in the token
        token.userId = user.userId; // Change from id to userId
        token.name = user.name || null;
        token.email = user.email;
        token.userType = user.userType || null; // Include user type if available
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Set session user data from the token
        session.user = {
          userId: token.userId,
          name: token.name || null,
          email: token.email,
          userType: token.userType || null,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for securing tokens and session data
  pages: {
    signIn: "/Login", // Redirect sign-in page
  },
};

// Initialize NextAuth with the configured options
const handler = NextAuth(authOptions);

// Export handler as GET and POST for authentication API
export { handler as GET, handler as POST };
