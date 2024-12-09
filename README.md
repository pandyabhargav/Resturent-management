# Restaurant Management
This project is a restaurant management system with both frontend and backend components. It allows restaurant admins to manage data, users, and events, and it enables customers to access the service through a client interface.

2. Setup Backend

cd backend/

npm install

npm run start

Ensure your MongoDB URI is set in the .env file.

3. Setup Frontend for Admin
 
Navigate to the frontend/admin folder and install dependencies:

cd frontend/admin

npm install

npm run dev

Navigate to the frontend/client folder and install dependencies:

cd frontend/client

npm install

npm run dev

Environment Variables

Make sure to add the following environment variables in your .env file:

MONGO_URI=mongodb+srv://<your-db-connection-string>

JWT_SECRET=<your-jwt-secret>

USER_JWT_SECRET=<user-jwt-secret>

NODE_ENV=development

EMAIL_USER=<your-email-address>

EMAIL_PASS=<your-email-password>

Postman Collection

For testing API endpoints, you can import the Postman collection:

Postman Collection

https://dark-meadow-735641.postman.co/workspace/New-Team-Workspace~8558b68d-64b2-498c-ba45-dd0400a2245e/collection/29105713-73a8714c-9f7c-4dc1-baf5-ec0d37854bf1?action=share&creator=40155886
