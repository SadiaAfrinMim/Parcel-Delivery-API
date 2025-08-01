#### 📦 Parcel Delivery API
A secure and efficient RESTful API for managing parcel deliveries with authentication, role-based access, parcel tracking, and status management. Built with TypeScript, Express.js, MongoDB, and JWT.

### 📌 Project Overview
The Parcel Delivery API allows users to send, receive, and manage parcels through different roles such as Sender, Receiver, and Admin. Each role has specific responsibilities and access control, making the system organized and secure. It also tracks parcel status history and allows authorized updates.

### Base URL
https://assainment-05-5h06owh0h-sadia660s-projects.vercel.app

### 🚀 Features
🔐 JWT Authentication & Role-Based Access

📤 Sender can create and cancel parcels

📥 Receiver can confirm delivery

🛠 Admin can view and update parcel statuses

📚 Request validation using Zod

📜 Parcel status change logs

✅ RESTful API architecture

🧪 Input validation & error handling middleware

### ⚙️ Tech Stack
Backend: Node.js, Express.js

Language: TypeScript

Database: MongoDB + Mongoose

Authentication: JWT

Validation: Zod

Password Security: Bcrypt

### 🧪 Roles & Permissions
Role	Permissions
Sender	Create parcel, cancel parcel, view own
Receiver	View assigned parcels, confirm delivery
Admin	View all parcels, update parcel status

### 🔐 Authentication Routes
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login & receive JWT token

### 📤 Sender Routes (Requires Role: sender)
Method	Endpoint	Description
POST-	/parcels/	Create a new parcel
GET-	/parcels/me	Get all parcels created by sender
PATCH	-/parcels/cancel/:id	Cancel a parcel by ID
GET	-/parcels/:id/status-log	Get parcel status log

### 📥 Receiver Routes (Requires Role: receiver)
Method	Endpoint	Description
GET-	/parcels/incoming	Get parcels assigned to receiver
PATCH	-/parcels/confirm-delivery/:id	Confirm parcel delivery
GET-	/parcels/:id/status-log	View status history of parcel

### 🛠 Admin Routes (Requires Role: admin)
Method	Endpoint	Description
GET-	/parcels/	Get all parcels in the system
PATCH-	/parcels/status/:id	Update parcel status by ID
GET-	/parcels/:id/status-log	View parcel status logs

### ✅ Request Validation
createParcelSchema → used in POST /parcels

updateParcelStatusSchema → used in PATCH /parcels/status/:id

All validations are powered by Zod.

 #### 📦 Example Parcel Lifecycle
Sender registers and logs in

Sender creates a parcel

Receiver logs in and views incoming parcel

Receiver confirms delivery

Admin checks or updates status

### 🔐 Authorization Middleware
authenticateJWT: Verifies JWT token

authorizeRoles('role'): Restricts access based on user role

Used to protect sensitive routes.

### 📁 Project Structure
src/
├── config/ // DB & JWT config
├── middlewares/ // Auth, validation, error handlers
├── modules/
│ ├── auth/ // Register, Login controllers & routes
│ └── parcel/ // Parcel routes, controller, validation
├── utils/ // Helper utilities
└── server.ts // App entry point

### 👩‍💻 Developed by
Sadia Afrin Mim
