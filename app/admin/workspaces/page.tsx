"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"

export default function AdminWorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([])
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function fetchWorkspaces() {
    try {
      const res = await fetch("/api/workspaces", { credentials: "include" })
      if (res.ok) {
        const data = await res.json()
        setWorkspaces(data)
      } else {
        toast.error("Failed to load workspaces")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong while fetching workspaces")
    }
  }

  async function handleAddWorkspace(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim(),
          capacity: parseInt(capacity, 10),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to add workspace")
        return
      }

      toast.success("Workspace created successfully!")
      setName("")
      setLocation("")
      setCapacity("")
      fetchWorkspaces()
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong while adding workspace")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin — Workspaces</h1>

        {/* Incoming Bookings Button */}
        <Link href="/admin/bookings">
          <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
            View Incoming Bookings
          </button>
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleAddWorkspace} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Workspace Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full border rounded p-2"
          min={1}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Workspace"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {workspaces.map((w) => (
            <tr key={w.id}>
              <td className="border p-2">{w.name}</td>
              <td className="border p-2">{w.location}</td>
              <td className="border p-2">{w.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
