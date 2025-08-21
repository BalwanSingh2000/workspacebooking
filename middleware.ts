// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl
//   const token = req.cookies.get(JWT_COOKIE_NAME)?.value

//   // No token → protect routes
//   if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/book'))) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   // If user is logged in, redirect away from /login
//   if (pathname === '/login' && token) {
//     // let client decide based on role
//     return NextResponse.next()
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*', '/book', '/login'],
//   runtime: 'nodejs', // still fine
// }

// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(JWT_COOKIE_NAME)?.value

  // 1️⃣ No token → protect admin & book pages
  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/book'))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 2️⃣ Logged-in users trying to access /login → allow client to handle role-based redirect
  if (pathname === '/login' && token) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/book', '/login'],
  runtime: 'nodejs', // ensures Node.js runtime (jwt verification should be in API route)
}
