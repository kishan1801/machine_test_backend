A. MERN Machine Test – Backend

1. Features Implemented
2. Admin Login with JWT Authentication
3. Protected Routes using Middleware
4. Agent Creation (Admin Only)
5. CSV Upload with Validation
6. Round-Robin Task Distribution
7. Tasks Stored with Agent Reference

B. Tech Stack

1. Node.js
2. Express.js
3. MongoDB Atlas
4. Mongoose
5. JWT
6. bcryptjs
7. Multer
8. csv-parser

C. Setup Instructions

1. git clone <repo>
2. cd server
3. npm install

D. Create .env:

1. PORT=3000
2. MONGO_URI=your_mongodb_uri
3. JWT_SECRET=your_secret_key

E. Run your server:

1. npm start

F. Admin Credentials (Seeded)

1. Email: admin@testmail.com
2. Password: 12345

G. My Assumptions

1. Single admin user (signup disabled for security)
2. CSV must contain headers: FirstName, Phone, Notes
3. Tasks distributed equally using round-robin logic
