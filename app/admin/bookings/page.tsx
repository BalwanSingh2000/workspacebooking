'use client'
import { useEffect, useState } from 'react'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('latest') // default sort

  async function fetchBookings() {
    try {
      const res = await fetch('/api/bookings', { credentials: 'include' })
      if (!res.ok) return
      const data = await res.json()
      if (Array.isArray(data)) {
        setBookings(data)
      }
    } catch (err) {
      console.error('Error fetching bookings:', err)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  async function updateStatus(bookingId: number, status: string) {
    try {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bookingId, status }),
      })
      fetchBookings()
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  // Filter + Sort Logic
  const filteredBookings = bookings
    .filter(b => {
      const searchLower = search.toLowerCase()
      const matchesSearch =
        b.workspace.name.toLowerCase().includes(searchLower) ||
        b.workspace.location.toLowerCase().includes(searchLower) ||
        b.fullName.toLowerCase().includes(searchLower) ||
        b.email.toLowerCase().includes(searchLower) ||
        b.phone.includes(searchLower)

      const matchesStatus = statusFilter === '' || b.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        const dateTimeA = new Date(`${a.date}T${a.startTime}`)
        const dateTimeB = new Date(`${b.date}T${b.startTime}`)
        return dateTimeB.getTime() - dateTimeA.getTime()
      } else if (sortBy === 'seats-asc') {
        return a.seatsRequired - b.seatsRequired
      } else if (sortBy === 'seats-desc') {
        return b.seatsRequired - a.seatsRequired
      }
      return 0
    })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incoming Bookings</h1>

      {/* Search, Filter, Sort Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, workspace..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1 min-w-[200px]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2"
        >
          <option value="latest">Latest First</option>
          <option value="seats-asc">Seats Required (Ascending)</option>
          <option value="seats-desc">Seats Required (Descending)</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="border w-full">
          <thead>
            <tr>
              <th className="border p-2">Workspace</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Start Time</th>
              <th className="border p-2">Seats</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(b => (
              <tr key={b.id}>
                <td className="border p-2">{b.workspace.name}</td>
                <td className="border p-2">{b.workspace.location}</td>
                <td className="border p-2">{b.date}</td>
                <td className="border p-2">{b.startTime}</td>
                <td className="border p-2">{b.seatsRequired}</td>
                <td className="border p-2">{b.fullName}</td>
                <td className="border p-2">{b.phone}</td>
                <td className="border p-2">{b.email}</td>
                <td className="border p-2">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="border p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
