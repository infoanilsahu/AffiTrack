import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/authOption";

const header = NextAuth(authOptions)

export { header as GET, header as POST}