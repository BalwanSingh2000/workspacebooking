import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'auth'

// Helper validation functions
function isValidName(name: string) {
  return typeof name === 'string' && name.trim().length >= 3
}
function isValidPhone(phone: string) {
  return /^[0-9]{10}$/.test(phone)
}
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function isValidTime(time: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time) // HH:MM 24-hour format
}

// Get bookings
export async function GET(req: Request) {
  try {
    const token = (req.headers.get('cookie') || '')
      .split('; ')
      .find(row => row.startsWith(COOKIE_NAME + '='))
      ?.split('=')[1]

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const decoded = jwt.verify(token, JWT_SECRET) as any

    let bookings
    if (decoded.role === 'admin') {
      bookings = await prisma.booking.findMany({
        include: { workspace: true },
        orderBy: { id: 'desc' } // latest first
      })
    } else {
      bookings = await prisma.booking.findMany({
        where: { loginEmail: decoded.email },
        include: { workspace: true },
        orderBy: { id: 'desc' }
      })
    }

    return NextResponse.json(bookings)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Create booking
export async function POST(req: Request) {
  try {
    const token = (req.headers.get('cookie') || '')
      .split('; ')
      .find(row => row.startsWith(COOKIE_NAME + '='))
      ?.split('=')[1]

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const decoded = jwt.verify(token, JWT_SECRET) as any

    const { workspaceId, date, startTime, seatsRequired, fullName, phone, email } = await req.json()

    // Backend validations
    if (!workspaceId || !date || !startTime || !seatsRequired || !fullName || !phone || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // ⬇⬇ Put the improved validations here
    if (!/^[A-Za-z\s]{3,}$/.test(fullName.trim())) {
      return NextResponse.json(
        { error: 'Full name must be at least 3 characters and contain only letters and spaces' },
        { status: 400 }
      )
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits (no spaces or symbols)' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!isValidTime(startTime)) {
      return NextResponse.json({ error: 'Invalid start time format' }, { status: 400 })
    }

    const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } })
    if (!workspace) return NextResponse.json({ error: 'Workspace not found' }, { status: 404 })

    if (seatsRequired > workspace.capacity) {
      return NextResponse.json({ error: `We are sorry but our max seats are ${workspace.capacity}` }, { status: 400 })
    }

    // const bookedSeats = await prisma.booking.aggregate({
    //   where: { workspaceId, date, startTime },
    //   _sum: { seatsRequired: true }
    // })

    // const totalBooked = bookedSeats._sum.seatsRequired || 0
    // if (totalBooked + seatsRequired > workspace.capacity) {
    //   return NextResponse.json({ error: `Only ${workspace.capacity - totalBooked} seats are available` }, { status: 400 })
    // }
    const bookedSeats = await prisma.booking.aggregate({
      where: { workspaceId, date, startTime },
      _sum: { seatsRequired: true }
    })
    
    const totalBooked = bookedSeats._sum.seatsRequired || 0
    if (totalBooked + seatsRequired > workspace.capacity) {
      return NextResponse.json({ error: `Only ${workspace.capacity - totalBooked} seats are available` }, { status: 400 })
    }
    
    // 🔹 Booking conflict check (place here)
    const existingBooking = await prisma.booking.findFirst({
      where: { workspaceId, date, startTime, loginEmail: decoded.email }
    })
    if (existingBooking) {
      return NextResponse.json({ error: 'You already have a booking for this workspace at this time' }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        workspaceId,
        date,
        startTime,
        seatsRequired,
        fullName,
        phone,
        email,
        loginEmail: decoded.email,
        status: 'pending'
      }
    })

    return NextResponse.json(booking)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Update booking status (Admin only)
export async function PATCH(req: Request) {
  try {
    const token = (req.headers.get('cookie') || '')
      .split('; ')
      .find(row => row.startsWith(COOKIE_NAME + '='))
      ?.split('=')[1]

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { bookingId, status } = await req.json()
    if (!bookingId || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
// import { NextResponse } from 'next/server'
// import prisma from '@/lib/prismadb'

// export async function GET(req: Request) {
//   const role = req.cookies.get('authSession')?.value
//   if (!role || role !== 'user') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const bookings = await prisma.booking.findMany({ include: { workspace: true } })
//     return NextResponse.json(bookings)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   const role = req.cookies.get('authSession')?.value
//   if (!role || role !== 'user') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const { workspaceId, date } = await req.json()

//   try {
//     const booking = await prisma.booking.create({
//       data: { workspaceId, date },
//     })
//     return NextResponse.json(booking)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

