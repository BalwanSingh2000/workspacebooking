"use client"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Quick Workspace Booking</h1>
        <p className="text-gray-600 mb-6">
          Book your workspace easily and manage bookings with ease.  
          Log in to get started!
        </p>

        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Login
        </button>
      </div>
    </div>
  )
}
