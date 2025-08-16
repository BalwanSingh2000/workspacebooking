# Workspace Booking System

A full-stack **Next.js 14** application for managing **workspace bookings** with **role-based authentication** (Admin & User), **real-time availability checks**, and **admin controls**.

---

## 🚀 Features

### **User**

- User registration and login with JWT authentication.
- Search and filter workspaces by **location** or **capacity**.
- Book a workspace by selecting **date**, **time**, and number of seats.
- View own bookings (latest first).
- Frontend + backend form validations for:
  - Full name
  - Phone number
  - Email address
  - Seat availability
- Instant feedback using **react-hot-toast** for success/error messages.

### **Admin**

- Add, view, and manage workspaces.
- View **all bookings** with filters and sorting:
  - Sort by date
  - Sort by seats required (ascending/descending)
- Update booking statuses (**Pending**, **Approved**, **Rejected**).
- Conflict checks to avoid overbooking.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT (JSON Web Token) stored in HTTP-only cookies
- **UI Feedback**: react-hot-toast
- **Responsive Design**: react-responsive

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

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd workspace-booking
   Install dependencies
   ```

bash
Copy
Edit
npm install
Set up environment variables
Create .env:

env
Copy
Edit
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
JWT_COOKIE_NAME=auth
Run database migrations

bash
Copy
Edit
npx prisma migrate dev
Seed the database

bash
Copy
Edit
npx prisma db seed
Seeds:

Admin: admin@altf.com / Admin@123

User: user@altf.com / User@123

Run the development server

bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser.

🔑 Admin & User Roles
Admin can:

Add workspaces

View and manage all bookings

Update booking statuses

User can:

Book workspaces

View personal bookings

🧪 Validations
Frontend & Backend:

Name: At least 3 characters.

Phone: Exactly 10 digits.

Email: Standard email format.

Seats: Cannot exceed workspace capacity.

Conflict Check: Prevent booking if seats are unavailable.

📜 Why This Approach?
App Router → Leverages Next.js 14 server actions and route handlers for clean API structure.

JWT in HTTP-only cookie → Secure authentication without exposing token to JavaScript.

Prisma ORM → Type-safe database queries with migrations.

react-hot-toast → Non-blocking, modern feedback instead of alerts.

Server-side sorting & filtering → Ensures correct ordering even if client manipulates data.

Seeded accounts → Easy testing for both roles.

📌 Future Improvements
Pagination for booking list.

Email notifications on booking approval/rejection.

Better role-based routing guards.

yaml
Copy
Edit

---

## **📚 KT (Knowledge Transfer) Summary**

Here’s how I’d explain your project in a KT session:

---

### **1. Overview**

This is a **role-based workspace booking system** built with Next.js.  
It allows **users** to browse and book workspaces and **admins** to manage them.

---

### **2. Core Modules**

- **Authentication**
  - Implemented with JWT
  - Tokens stored in HTTP-only cookies for security
- **Bookings**
  - API handles booking creation, retrieval, and conflict checks
  - Bookings stored with `status` (pending, approved, rejected)
- **Workspaces**
  - Managed entirely by admin
  - Stores name, location, capacity

---

### **3. Important Files**

- `/app/api/bookings/route.ts` → Booking API (validations + DB logic)
- `/app/api/workspaces/route.ts` → Workspace API
- `/app/book/page.tsx` → User booking UI
- `/app/admin/bookings/page.tsx` → Admin bookings list
- `/app/admin/workspaces/page.tsx` → Workspace management

---

### **4. Why This Design**

- Next.js App Router keeps backend and frontend in one repo → easier deployment.
- Prisma ORM → simplifies database migrations & queries.
- Toast notifications → improve UX over blocking alerts.
- Backend validations → prevent malicious data bypass.

---

### **5. Development Process**

You:

1. Created authentication (JWT).
2. Built booking API with conflict checks.
3. Built UI for both User and Admin.
4. Added sorting, filtering, and search.
5. Replaced alerts with toasts for better UX.
6. Seeded database for quick testing.

---

If you want, I can also write you a **"What all I did, how I did, and why I did"** section in plain English so you can explain it during any review.

Do you want me to prepare that now? That will be your **project explanation in one go**.

1. What I Did

I developed a Workspace Booking Application using Next.js, PostgreSQL, Prisma ORM, and JWT authentication.
The app supports:

User login & registration

Role-based access (Admin / User)

Workspace management (Admins can create, list, and manage workspaces)

Booking system with seat limits & conflict detection

Admin booking approval/rejection

Search, filter, and sorting for bookings

Form validations (both frontend & backend)

Toast notifications for user feedback

Database seeding for test accounts

2. How I Did It
   Frontend

Used Next.js App Router for modern server/client component structure.

Created API route calls using fetch with { credentials: 'include' } to send cookies.

Implemented React state management for form inputs & booking lists.

Used react-hot-toast for success/error feedback instead of browser alerts.

Added search & filter features for the admin bookings table with sorting by date & seats.

Used conditional rendering for "No bookings found" vs table display.

Backend

Created API routes under /api for:

/api/auth → Login/Logout with JWT in HTTP-only cookies

/api/workspaces → CRUD operations for workspaces

/api/bookings → Create, fetch, and update bookings

Added backend validation for:

Full name length

Email format

Phone number format

Time format

Seat capacity limits

Booking conflicts (date/time/seat availability)

Implemented role checks in protected routes (admin only for some endpoints).

Sorted booking results so latest bookings appear first.

Seeded database with default admin and user accounts using hashed passwords.

Database (PostgreSQL + Prisma)

Defined Prisma schema for User, Workspace, and Booking tables.

Used relations between models (Workspace has many Booking, User linked via email).

Created migrations to keep database schema in sync.

Used aggregate queries in Prisma to calculate available seats before booking.

3. Why I Did It This Way

Next.js App Router → Future-proof architecture with server components and built-in API routes.

Prisma ORM → Cleaner, type-safe DB queries instead of raw SQL.

PostgreSQL → Reliable, relational database with good support for Prisma.

JWT + HTTP-only cookies → Secure authentication without exposing tokens in localStorage.

Frontend + Backend validation → Prevents both bad user input and malicious requests.

Toast notifications → Better UX than blocking alert popups.

Search & Filter in Admin → Makes it easy to manage large numbers of bookings.

Role-based access control → Keeps admin-only actions protected.

Seeding database → Makes testing and demoing the app easier.
