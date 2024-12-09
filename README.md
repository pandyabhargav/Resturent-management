#Restaurant Management
This project is a restaurant management system with both frontend and backend components. It allows restaurant admins to manage data, users, and events, and it enables customers to access the service through a client interface.

Folder Structure
bash
Copy code
Restaurant-management/
├── backend/            # Backend code (API and database)
└── frontend/           # Frontend code
    ├── admin/          # Admin panel for restaurant management
    └── client/         # Customer-facing interface
Prerequisites
Make sure you have the following installed:

Node.js: Download Node.js
MongoDB Atlas: Set up a MongoDB database and get your connection URI.
Postman: For testing API endpoints, use the provided Postman collection.
Getting Started
1. Clone the Repository
bash
Copy code
git clone <repository-url>
cd Restaurant-management
2. Setup Backend
Navigate to the backend folder and install dependencies:

bash
Copy code
cd backend/
npm install
Run the backend server:

bash
Copy code
npm run start
Ensure your MongoDB URI is set in the .env file.

3. Setup Frontend for Admin
Navigate to the frontend/admin folder and install dependencies:

bash
Copy code
cd frontend/admin
npm install
Run the admin panel:

bash
Copy code
npm run dev
4. Setup Frontend for Client
Navigate to the frontend/client folder and install dependencies:

bash
Copy code
cd frontend/client
npm install
Run the client interface:

bash
Copy code
npm run dev
Environment Variables
Make sure to add the following environment variables in your .env file:

makefile
Copy code
MONGO_URI=mongodb+srv://<your-db-connection-string>
JWT_SECRET=<your-jwt-secret>
USER_JWT_SECRET=<user-jwt-secret>
NODE_ENV=development
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>
Postman Collection
For testing API endpoints, you can import the Postman collection:

Postman Collection
