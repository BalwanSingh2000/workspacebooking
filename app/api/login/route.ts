// // import { NextResponse } from 'next/server'
// // import { prisma } from '@/lib/prisma'
// // import bcrypt from 'bcrypt'
// // import jwt from 'jsonwebtoken'

// // const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey'
// // const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

// // export async function POST(req: Request) {
// //   const { email, password } = await req.json()

// //   // 1️⃣ Find user
// //   const user = await prisma.user.findUnique({ where: { email } })
// //   if (!user) {
// //     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
// //   }

// //   // 2️⃣ Verify password
// //   const valid = await bcrypt.compare(password, user.password)
// //   if (!valid) {
// //     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
// //   }

// //   // 3️⃣ Create token
// //   console.log('JWT_SECRET in /api/login:', JWT_SECRET)
// //   const token = jwt.sign(
// //     { id: user.id, role: user.role, email: user.email },
// //     JWT_SECRET,
// //     { expiresIn: '1h' }
// //   )

// //   console.log('Token issued in /api/login:', token)

// //   // 4️⃣ Send token in cookie
// //   const res = NextResponse.json({ ok: true, role: user.role })
// //   res.cookies.set(COOKIE_NAME, token, {
// //     httpOnly: true,
// //     // secure: process.env.NODE_ENV === 'production', // false in dev
// //     secure: false,
// //     sameSite: 'lax',
// //     path: '/', // needed for middleware
// //   })

// //   return res
// // }
// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey'
// const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

// export async function POST(req: Request) {
//   const { email, password } = await req.json()

//   // 1️⃣ Find user
//   const user = await prisma.user.findUnique({ where: { email } })
//   if (!user) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
//   }

//   // 2️⃣ Verify password
//   const valid = await bcrypt.compare(password, user.password)
//   if (!valid) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
//   }

//   // 3️⃣ Create token
//   const token = jwt.sign(
//     { id: user.id, role: user.role, email: user.email },
//     JWT_SECRET,
//     { expiresIn: '1h' }
//   )

//   // 4️⃣ Send token in cookie
//   const res = NextResponse.json({ ok: true, role: user.role })
//   res.cookies.set(COOKIE_NAME, token, {
//     httpOnly: true,
//     secure: false,        // ✅ false for dev, change to true in prod HTTPS
//     sameSite: 'lax',
//     path: '/',            // required for middleware to read
//   })

//   return res
// }

// app/api/login/route.ts


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey'
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // 1️⃣ Find user
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // 2️⃣ Verify password
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // 3️⃣ Create token
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  // 4️⃣ Send token in cookie
  const res = NextResponse.json({ ok: true, role: user.role })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true on HTTPS
    sameSite: 'lax',
    path: '/',
  })

  return res
}

