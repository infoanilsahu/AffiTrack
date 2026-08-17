import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from "next-auth/next";
import { authOptions } from "./lib/authOption";
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const session = await getServerSession(authOptions)
    const { pathname } = request.nextUrl

    if( session && pathname == '/signin' ) {
        return NextResponse.redirect(new URL('/org', request.url))
    }

    if( !session && pathname.endsWith('/links') ) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    if( !session && pathname.startsWith("/org") ) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/dashboard',
    '/org/:path',
    '/:slug/links'
  ],
}