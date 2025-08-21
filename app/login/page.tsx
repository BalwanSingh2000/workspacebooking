// // 'use client'

// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import LoadingSpinner from '../components/LoadingSpinner'

// // export default function LoginPage() {
// //   const router = useRouter()
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [error, setError] = useState('')
// //   const [loading, setLoading] = useState(false)

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setError('')
// //     setLoading(true)

// //     try {
// //       const res = await fetch('/api/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //         credentials: 'include' // 🔑 ensures browser stores the cookie
// //       })
      

// //       const data = await res.json()
// //       console.log('API Response:', data)

// //       if (!res.ok) {
// //         setError(data.error || 'Login failed')
// //         setLoading(false)
// //         return
// //       }

// //       if (data.role === 'admin') {
// //         console.log('Redirecting to /admin/workspaces...')
// //         setTimeout(() => {
// //           router.push('/admin/workspaces') // ✅ small delay to ensure state updates
// //         }, 100)
// //       } else {
// //         console.log('Redirecting to /')
// //         setTimeout(() => {
// //           router.push('/book')
// //         }, 100)
// //       }
// //     } catch (err) {
// //       console.error('Login error:', err)
// //       setError('Something went wrong')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="max-w-sm mx-auto mt-20 p-6 border rounded bg-white shadow">
// //       <h1 className="text-xl font-bold mb-4">Login</h1>
// //       <form onSubmit={handleSubmit} className="space-y-3">
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full border rounded p-2"
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full border rounded p-2"
// //           required
// //         />
// //         {error && <p className="text-red-600 text-sm">{error}</p>}
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
// //         >
// //           {loading ? <LoadingSpinner/> : 'Login'}
// //         </button>
// //       </form>

// //       <div className="mt-4 text-xs text-gray-500">
// //         <p>Admin: admin@altf.com / Admin@123</p>
// //         <p>User: user@altf.com / User@123</p>
// //       </div>
// //     </div>
// //   )
// // }
// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import LoadingSpinner from '../components/LoadingSpinner'

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include', // ✅ important
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         setError(data.error || 'Login failed')
//         setLoading(false)
//         return
//       }

//       // Redirect based on role
//       if (data.role === 'admin') router.push('/admin/workspaces')
//       else router.push('/book')

//     } catch (err) {
//       console.error('Login error:', err)
//       setError('Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-sm mx-auto mt-20 p-6 border rounded bg-white shadow">
//       <h1 className="text-xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />
//         {error && <p className="text-red-600 text-sm">{error}</p>}
//         <button type="submit" disabled={loading} className="w-full bg-black text-white p-2 rounded disabled:opacity-50">
//           {loading ? <LoadingSpinner /> : 'Login'}
//         </button>
//       </form>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../components/LoadingSpinner'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Redirect based on role
      if (data.role === 'admin') router.push('/admin/workspaces')
      else router.push('/book')
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded bg-white shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-black text-white p-2 rounded disabled:opacity-50">
          {loading ? <LoadingSpinner /> : 'Login'}
        </button>
      </form>
    </div>
  )
}
// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = async e => {
//     e.preventDefault()
//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await res.json()
//     if (!res.ok) return setError(data.error)

//     // Redirect based on role
//     if (data.role === 'admin') router.push('/admin/workspaces')
//     else router.push('/book')
//   }

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
//         <h1 className="text-2xl font-bold">Login</h1>
//         {error && <p className="text-red-500">{error}</p>}
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//         <button type="submit" className="bg-blue-500 text-white py-2 rounded">Login</button>
//       </form>
//     </div>
//   )
// }


