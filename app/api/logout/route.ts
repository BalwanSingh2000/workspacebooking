import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(process.env.JWT_COOKIE_NAME || 'auth')
  return res
}
// app/api/logout/route.ts
// import { NextResponse } from 'next/server'

// export async function POST() {
//   const res = NextResponse.json({ message: 'Logged out' })
//   res.cookies.set('authSession', '', { maxAge: 0, path: '/' })
//   return res
// }
