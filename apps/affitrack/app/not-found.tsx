import { getServerSession } from "next-auth/next"
import { authOptions } from "../lib/authOption";
import { redirect } from "next/navigation";
import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: '404 | AffiTrack',
  description: 'The page you are looking for does not exist.',
}

export default async function NotFound() {
    const session = await getServerSession(authOptions)

    if( !session || !session.user.email ) {
        redirect('/signin')
    }

    return (
        <>
            <h1>404</h1>
            <h4>Not Found that page</h4>
            { session?.user.email && <div>You're signed in as <span className="font-semibold">{session.user.email}</span></div>}
            <Link href="/signin">
            <div
                className="p-2 px-4 bg-black text-white rounded-md w-fit m-2 "
            >
                Return Home
            </div>
            </Link>
        </>
    )
}