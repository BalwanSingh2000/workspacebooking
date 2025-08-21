// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(JWT_COOKIE_NAME)?.value

  // No token → protect /admin and /book, allow /login
  if (!token) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/book')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
  }

  // Token exists → prevent logged-in users from accessing /login
  if (pathname === '/login') {
    // We'll let the client-side login page handle redirect after verifying role
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/book', '/login'],
  runtime: 'nodejs', // Keep Node runtime, but no jwt.verify here
}
