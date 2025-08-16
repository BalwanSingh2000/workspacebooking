import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || "auth"

export async function GET(req: Request) {
  try {
    const token = (req.headers.get("cookie") || "")
      .split("; ")
      .find(row => row.startsWith(COOKIE_NAME + "="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    const email = decoded.email

    const bookings = await prisma.booking.findMany({
      where: { email },
      include: { workspace: true },
      orderBy: { date: "asc" }
    })

    return NextResponse.json(bookings)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
