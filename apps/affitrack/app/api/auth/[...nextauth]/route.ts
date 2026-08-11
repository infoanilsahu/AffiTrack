import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/authOption";

const headler = NextAuth(authOptions)

export { headler as GET, headler as POST}