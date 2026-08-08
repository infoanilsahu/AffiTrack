import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db, schema, orm } from "@repo/db";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ account, user }) {
      try {
        if (account?.provider !== "google") {
          return true;
        }

        if (!user?.email) {
          return false;
        }

        const dbEmail = await db
          .select({
            email: schema.account.email,
          })
          .from(schema.account)
          .where(
            orm.eq(schema.account.email, user.email)
          )
          .limit(1);


        if (dbEmail.length === 0) {
          await db.insert(schema.account).values({
            email: user.email,
            provider: "google",
          });

        }

        return true;
      } catch (error) {
        console.error("Google sign-in database error:", error);
        return false;
      }
    },
  },
};