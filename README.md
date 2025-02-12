Inventory Management System – Backend
Overview
This is the backend component of the XYZ Organization Inventory Management System, a web-based application designed to enhance the traceability and accountability of the organization's assets. The backend provides RESTful APIs to manage assets, track assignments, monitor item conditions, and generate reports.

Features
Asset Management: CRUD operations for inventory items.
Assignment Tracking: Manage item assignments to employees or trainees.
Condition Monitoring: Log and update the condition of items.
Reporting: Generate reports on inventory status and usage.
Authentication & Authorization: Secure access with role-based permissions.
Technologies Used
Runtime Environment: Node.js
Framework: Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Environment Management: dotenv
Live API
The backend API is deployed and accessible at: https://stock-backend-z435.onrender.com

Getting Started
Follow these instructions to set up and run the backend application locally.

Prerequisites
Node.js: Ensure you have Node.js (version 14.x or later) installed.
npm: npm (version 6.x or later) should be available.
MongoDB: Access to a MongoDB instance (local or cloud).
Installation Steps
Clone the Repository:


git clone https://github.com/angeiracyadukunda/stock-backend.git
cd xyz-inventory-backend
Install Dependencies:


npm install
Configure Environment Variables:

Create a .env file in the root directory.
Add the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the Application:


npm start
The API will be accessible at http://localhost:8000.
Running in Development Mode
For development purposes, you can use nodemon to automatically restart the server on code changes:


npm run dev
API Documentation
The API provides the following endpoints:

Authentication:

POST /api/auth/login: Authenticate a user and retrieve a token.
POST /api/auth/register: Register a new user.
Inventory Items:

GET /api/items: Retrieve all inventory items.
POST /api/items: Create a new inventory item.
GET /api/items/:id: Retrieve a specific item by ID.
PUT /api/items/:id: Update an existing item.
DELETE /api/items/:id: Delete an item.
Assignments:

GET /api/assignments: Retrieve all assignments.
POST /api/assignments: Create a new assignment.
GET /api/assignments/:id: Retrieve a specific assignment by ID.
PUT /api/assignments/:id: Update an existing assignment.
DELETE /api/assignments/:id: Delete an assignment.
Users:

GET /api/users: Retrieve all users.
GET /api/users/:id: Retrieve a specific user by ID.
PUT /api/users/:id: Update an existing user.
DELETE /api/users/:id: Delete a user.
For detailed request and response structures, please refer to the API documentation or the source code.

Deployment
To deploy the backend application:

Set Up Environment:

Ensure that the target environment has Node.js and npm installed.
Set up a MongoDB instance and obtain the connection string.
Environment Variables:

Configure the environment variables (PORT, MONGODB_URI, JWT_SECRET) appropriately.
Build and Run:

Install dependencies:

npm install
Start the application:

npm start