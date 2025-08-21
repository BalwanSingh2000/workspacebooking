# Workspace Booking System

A full-stack Next.js 14 application for managing workspace bookings with role-based authentication (Admin & User), real-time availability checks, and admin controls.

---

## Features

1> User

- User registration and login with JWT authentication.
- Search and filter workspaces by location or capacity.
- Book a workspace by selecting date, time, and number of seats.
- View own bookings (latest first).
- Frontend + backend form validations for:
  - Full name
  - Phone number
  - Email address
  - Seat availability
- Instant feedback using react-hot-toast for success/error messages.

2> Admin

- Add, view, and manage workspaces.
- View all bookings with filters and sorting:
  - Sort by date
  - Sort by seats required (ascending/descending)
- Update booking statuses (Pending, Approved, Rejected).
- Conflict checks to avoid overbooking.

---

3> Tech Stack

- Frontend: Next.js 14 (App Router), React, Tailwind CSS
- Backend: Next.js API Routes
- Database: PostgreSQL with Prisma ORM
- Auth: JWT (JSON Web Token) stored in HTTP-only cookies
- UI Feedback: react-hot-toast
- Responsive Design: react-responsive

---

## 📂 Project Structure

app/
├── api/
│ ├── bookings/route.ts # Booking CRUD API + backend validations
│ ├── workspaces/route.ts # Workspace CRUD API
│ ├── auth/ # Login & register routes
├── admin/
│ ├── bookings/page.tsx # Admin booking list + filters + sort
│ ├── workspaces/page.tsx # Admin workspace management
├── book/page.tsx # User booking form + list
├── login/page.tsx # Login page
├── register/page.tsx # Registration page
lib/
├── prisma.ts # Prisma client
prisma/
├── schema.prisma # Database schema
├── seed.ts # Seed admin & user accounts

---

## Installation & Setup

1> Clone the repository

git clone <repo-url>
cd workspace-booking
Install dependencies
npm install
Set up environment variables
Create .env:

2> env and database

DATABASE_URL="file:./dev.db"
JWT_SECRET=mysupersecretkey
JWT_COOKIE_NAME=auth
Run database migrations
npx prisma migrate dev
Seed the database
npx prisma db seed
Seeds:
Admin: admin@altf.com / Admin@123
User: user@altf.com / User@123
Run the development server
npm run dev
Open http://localhost:3000 in your browser.

## Project Overview

🔑 Admin & User Roles
1>Admin can:

        a.Add workspaces

        b.View and manage all bookings

        c.Update booking statuses

2>User can:

        a.Book workspaces

        b.View personal bookings

3>Validations
Frontend & Backend:

        a.Name: At least 3 characters.

        b.Phone: Exactly 10 digits.

        c.Email: Standard email format.

        d.Seats: Cannot exceed workspace capacity.

        e.Conflict Check: Prevent booking if seats are unavailable.

4>Why This Approach?
a. App Router → Leverages Next.js 14 server actions and route handlers for clean API structure.

        b.JWT in HTTP-only cookie → Secure authentication without exposing token to JavaScript.

        c.Prisma ORM → Type-safe database queries with migrations.

        d.react-hot-toast → Non-blocking, modern feedback instead of alerts.

        e.Server-side sorting & filtering → Ensures correct ordering even if client manipulates data.

        f.Seeded accounts → Easy testing for both roles.
