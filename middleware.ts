// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey'
// const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

// async function verifyJWT(token: string) {
//   const encoder = new TextEncoder()
//   const key = await crypto.subtle.importKey(
//     'raw',
//     encoder.encode(JWT_SECRET),
//     { name: 'HMAC', hash: 'SHA-256' },
//     false,
//     ['verify']
//   )

//   const [headerB64, payloadB64, signatureB64] = token.split('.')
//   const data = `${headerB64}.${payloadB64}`
//   const signature = Uint8Array.from(atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))

//   const valid = await crypto.subtle.verify(
//     'HMAC',
//     key,
//     signature,
//     new TextEncoder().encode(data)
//   )

//   if (!valid) throw new Error('Invalid signature')

//   return JSON.parse(atob(payloadB64))
// }

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl

//   if (pathname.startsWith('/admin')) {
//     const token = req.cookies.get(JWT_COOKIE_NAME)?.value
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url))
//     }

//     try {
//       const decoded = await verifyJWT(token)
//       if (decoded.role !== 'admin') {
//         return NextResponse.redirect(new URL('/', req.url))
//       }
//     } catch {
//       return NextResponse.redirect(new URL('/login', req.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey'
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 🔒 Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get(JWT_COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET)
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    } catch (err) {
      console.error('JWT verification failed:', err)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
