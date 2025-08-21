// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET!
// const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

// // GET workspaces — accessible to all logged-in users
// export async function GET(req: Request) {
//   try {
//     const token = (req.headers.get('cookie') || '')
//       .split('; ')
//       .find(row => row.startsWith(COOKIE_NAME + '='))
//       ?.split('=')[1]

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     // Just verify token, no role check here
//     jwt.verify(token, JWT_SECRET)

//     const workspaces = await prisma.workspace.findMany({
//       select: {
//         id: true,
//         name: true,
//         location: true,
//         capacity: true
//       }
//     })

//     return NextResponse.json(workspaces)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }

// // POST workspaces — admin only
// export async function POST(req: Request) {
//   try {
//     const token = (req.headers.get('cookie') || '')
//       .split('; ')
//       .find(row => row.startsWith(COOKIE_NAME + '='))
//       ?.split('=')[1]

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as any
//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
//     }

//     const { name, location, capacity } = await req.json()
//     if (!name || !location || !capacity) {
//       return NextResponse.json(
//         { error: 'Name, location, and capacity required' },
//         { status: 400 }
//       )
//     }

//     const workspace = await prisma.workspace.create({
//       data: { name, location, capacity },
//     })
//     return NextResponse.json(workspace)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

// GET workspaces — accessible to all logged-in users
export async function GET(req: Request) {
  try {
    const token = (req.headers.get('cookie') || '')
      .split('; ')
      .find(row => row.startsWith(COOKIE_NAME + '='))
      ?.split('=')[1]

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Just verify token, no role check here
    jwt.verify(token, JWT_SECRET)

    const workspaces = await prisma.workspace.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        capacity: true,
        image: true, // ✅ matches Prisma schema
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(workspaces)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST workspaces — admin only
export async function POST(req: Request) {
  try {
    const token = (req.headers.get('cookie') || '')
      .split('; ')
      .find(row => row.startsWith(COOKIE_NAME + '='))
      ?.split('=')[1]

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 👇 destructure correctly
    const { name, location, capacity, imageUrl } = await req.json()
    if (!name || !location || !capacity) {
      return NextResponse.json(
        { error: 'Name, location, and capacity required' },
        { status: 400 }
      )
    }

    // 👇 store `imageUrl` into DB `image` field
    const workspace = await prisma.workspace.create({
      data: { 
        name, 
        location, 
        capacity, 
        image: imageUrl || null, // ✅ fixed
      },
    })

    return NextResponse.json(workspace, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
