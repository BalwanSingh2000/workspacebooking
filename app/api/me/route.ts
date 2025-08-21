import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  // ✅ await cookies() since it's now a Promise in Next.js 15
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.JWT_COOKIE_NAME || "auth")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = verifyJwt(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: payload });
}
