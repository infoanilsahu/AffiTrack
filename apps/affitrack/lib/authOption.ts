import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { db, schema, orm } from "@repo/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";


export const authOptions: AuthOptions = {

    adapter: DrizzleAdapter(db),

    session: {
        strategy: "jwt"
    },
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER!,
            from: process.env.EMAIL_FROM!,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ account, user, email }) {
            try {
            if (account?.provider === "google") {
                if (!user?.email) {
                    return false;
                }
    
                const dbEmail = await db
                    .select({
                    email: schema.appAccount.email,
                    })
                    .from(schema.appAccount)
                    .where(
                    orm.eq(schema.appAccount.email, user.email)
                    )
                    .limit(1);
    
    
                if (dbEmail.length === 0) {
                    await db.insert(schema.appAccount).values({
                    email: user.email,
                    provider: "google",
                    });
    
                }
    
                return true;
            }

            if( account?.provider === "email" ) {
                if( !user?.email ) {
                    return false
                }

                const dbEmail = await db
                    .select({
                    email: schema.appAccount.email,
                    })
                    .from(schema.appAccount)
                    .where(
                    orm.eq(schema.appAccount.email, user.email)
                    )
                    .limit(1);
    
    
                if (dbEmail.length === 0) {
                    await db.insert(schema.appAccount).values({
                    email: user.email,
                    provider: "google",
                    });
    
                }

                return true;
            }

            return true;

            } catch (error) {
            console.error("Google sign-in database error:", error);
            return false;
            }
        },

        async jwt({ token, user }) {
            if( user ) {
                token.id = user.id
            }

            return token
        },

        async session({token, session}) {            
            if( session.user && token.id ) {
                session.user.id = token.id
            }
            return session
        }

    },
};