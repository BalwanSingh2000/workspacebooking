import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

export type JwtPayload = { id: number; email: string; role: 'admin' | 'user' }

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

export function setAuthCookie(token: string) {
  cookies().set(JWT_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  })
}

export function clearAuthCookie() {
  cookies().delete(JWT_COOKIE_NAME)
}
