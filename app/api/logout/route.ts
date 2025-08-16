import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(process.env.JWT_COOKIE_NAME || 'auth')
  return res
}
