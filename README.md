📦 Parcel Delivery API
A RESTful API for managing parcel deliveries with authentication, role-based access, and delivery tracking. Built with Express.js, TypeScript, MongoDB, and JWT.

🔗 Base URL
http://localhost:5000/api

🛠 Technologies Used

Node.js, Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

Bcrypt for password hashing

Zod for request validation

🧪 Roles

Sender: Creates and cancels parcels

Receiver: Confirms parcel delivery

Admin: Views and updates all parcel statuses

🔐 Authentication Routes

Method	Endpoint	Description
POST	/auth/register	Register a user
POST	/auth/login	Login and receive token

📤 Sender Routes

Requires: JWT token + role = sender

Method	Endpoint	Description
POST	/parcels/	Create a new parcel
GET	/parcels/me	Get all parcels created by sender
PATCH	/parcels/cancel/:id	Cancel a parcel by ID
GET	/parcels/:id/status-log	Get parcel status log by ID

📥 Receiver Routes

Requires: JWT token + role = receiver

Method	Endpoint	Description
GET	/parcels/incoming	Get parcels assigned to receiver
PATCH	/parcels/confirm-delivery/:id	Confirm parcel delivery by ID

🛠 Admin Routes

Requires: JWT token + role = admin

Method	Endpoint	Description
GET	/parcels/	Get all parcels in the system
PATCH	/parcels/status/:id	Update parcel status by ID

📋 Parcel Status Log

Accessible by: sender, receiver, admin

Method	Endpoint	Description
GET	/parcels/:id/status-log	Get status change history of parcel

✅ Request Validation

Zod schemas are used to validate requests such as:

createParcelSchema for /parcels/ POST

updateParcelStatusSchema for /parcels/status/:id PATCH

🔐 Authorization

JWT token required for all protected routes.

Middleware: authenticateJWT + authorizeRoles('roleName')

📦 Example Parcel Flow

Sender registers and logs in

Sender creates a parcel

Receiver logs in and confirms delivery

Admin views or updates parcel status

📄 Author

Developed by Sadia Afrin Mim

📝 License

This project is for educational and portfolio purposes only.

📁 Folder Structure (optional if you want)

src/
├── modules/
│ ├── auth/
│ └── parcel/
├── middlewares/
├── utils/
├── config/
└── server.ts