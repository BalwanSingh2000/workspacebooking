"use client"
import { useState, useEffect } from "react"
import toast from "react-hot-toast";


interface Workspace {
  id: number
  name: string
  location: string
  capacity: number
}

interface Booking {
  id: number
  workspace: { name: string; location: string }
  date: string
  seatsRequired: number
  status: string
}

export default function BookingPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [seatsRequired, setSeatsRequired] = useState(1)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("") // new email field
  const [message, setMessage] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])

  // Fetch workspaces
  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const res = await fetch("/api/workspaces")
        if (res.ok) {
          const data = await res.json()
          setWorkspaces(data)
        }
      } catch (err) {
        console.error("Error fetching workspaces:", err)
      }
    }
    fetchWorkspaces()
  }, [])

  // Fetch my bookings
  async function fetchBookings() {
    try {
      const res = await fetch("/api/bookings", { credentials: "include" })
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      }
    } catch (err) {
      console.error("Error fetching bookings:", err)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Handle booking submit
  async function handleBooking(e: React.FormEvent) {
    e.preventDefault()
    // setMessage("")

    // if (!selectedWorkspace) {
    //   setMessage("Please select a workspace.")
    //   return
    // }
    // if (!date) {
    //   setMessage("Please select a date.")
    //   return
    // }
    // if (!fullName.trim() || fullName.trim().length < 3) {
    //     setMessage("Full name must be at least 3 characters long.")
    //     return
    //   }
    //   if (!/^\d{10}$/.test(phone)) {
    //     setMessage("Please enter a valid 10-digit phone number.")
    //     return
    //   }
    //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    //     setMessage("Please enter a valid email address.")
    //     return
    //   }
    // if (seatsRequired < 1 || seatsRequired > selectedWorkspace.capacity) {
    //   setMessage(`We are sorry but our max seats are ${selectedWorkspace.capacity}.`)
    //   return
    // }
    if (!selectedWorkspace) {
        toast.error("Please select a workspace.");
        return;
      }
      if (!date) {
        toast.error("Please select a date.");
        return;
      }
      if (!fullName.trim() || fullName.trim().length < 3) {
        toast.error("Full name must be at least 3 characters long.");
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        toast.error("Please enter a valid 10-digit phone number.");
        return;
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (seatsRequired < 1 || seatsRequired > selectedWorkspace.capacity) {
        toast.error(`We are sorry but our max seats are ${selectedWorkspace.capacity}.`);
        return;
      }
      
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        workspaceId: selectedWorkspace.id,
        date,
        startTime,
        seatsRequired,
        fullName,
        phone,
        email // send contact email
      }),
    })

    const data = await res.json()
    // if (res.ok) {
    //   alert("Booking successful!")
    //   setDate("")
    //   setSeatsRequired(1)
    //   setFullName("")
    //   setPhone("")
    //   setEmail("")
    //   setSelectedWorkspace(null)
    //   fetchBookings()
    // } else {
    //   setMessage(data.error || "Booking failed")
    // }
    if (res.ok) {
        toast.success("Booking successful!");
        setDate("");
        setSeatsRequired(1);
        setFullName("");
        setPhone("");
        setEmail("");
        setSelectedWorkspace(null);
        fetchBookings();
      } else {
        toast.error(data.error || "Booking failed");
      }
      
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book a Workspace</h1>

      <form onSubmit={handleBooking} className="space-y-4">
        {/* Workspace dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select Workspace</label>
          <select
            value={selectedWorkspace?.id || ""}
            onChange={(e) => {
              const workspace = workspaces.find(w => w.id === Number(e.target.value)) || null
              setSelectedWorkspace(workspace)
              setSeatsRequired(1)
            }}
            className="border p-2 w-full"
            required
          >
            <option value="">-- Select a workspace --</option>
            {workspaces.map(w => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.location})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Start Time</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="border p-2 w-full" />
        </div>

        {/* Seats Required */}
        {selectedWorkspace && (
          <div>
            <label className="block mb-1 font-medium">
              Seats Required (max seats are {selectedWorkspace.capacity})
            </label>
            <input
              type="number"
              min="1"
              max={selectedWorkspace.capacity}
              value={seatsRequired}
              onChange={(e) => setSeatsRequired(Number(e.target.value))}
              className="border p-2 w-full"
              required
            />
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Error message above button */}
        {message && <p className="text-red-500">{message}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!selectedWorkspace || seatsRequired > (selectedWorkspace?.capacity || 0)}
        >
          Book Now
        </button>
      </form>

      {/* My Bookings */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="border w-full">
            <thead>
              <tr>
                <th className="border p-2">Workspace</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Seats</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td className="border p-2">{b.workspace.name}</td>
                  <td className="border p-2">{b.workspace.location}</td>
                  <td className="border p-2">{b.date}</td>
                  <td className="border p-2">{b.startTime}</td>
                  <td className="border p-2">{b.seatsRequired}</td>
                  <td className="border p-2">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
