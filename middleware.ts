import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(JWT_COOKIE_NAME)?.value

  // No token → protect routes
  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/book'))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // If user is logged in, redirect away from /login
  if (pathname === '/login' && token) {
    // let client decide based on role
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/book', '/login'],
  runtime: 'nodejs', // still fine
}

// middleware.ts



// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const AUTH_COOKIE_NAME = 'auth' // any name, can be same as old JWT cookie

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl
//   const token = req.cookies.get(AUTH_COOKIE_NAME)?.value

//   // Protect admin and /book routes
//   if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/book'))) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   // Allow login page even if "logged in" (client can redirect)
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*', '/book', '/login'],
//   runtime: 'nodejs', // ✅ Node.js runtime
// }


// app/middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl
//   const role = req.cookies.get('authSession')?.value

//   // Protect admin routes
//   if (!role && (pathname.startsWith('/admin') || pathname.startsWith('/book'))) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   // Prevent logged-in users from visiting /login
//   if (pathname === '/login' && role) {
//     return NextResponse.redirect(role === 'admin' ? '/admin/workspaces' : '/book')
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*', '/book', '/login'],
//   runtime: 'nodejs',
// }

