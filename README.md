# Task Management Application Documentation

## Overview
This document provides an overview of the Task Management application's frontend and backend, including setup instructions, project structure, key components, API endpoints, and database schema.

---
## Tech Stack

### Frontend:

- React Native - For building cross-platform mobile applications

- Redux - State management

- React Navigation - Navigation between screens

- Axios - HTTP requests to backend

- AsyncStorage - Persistent storage for authentication tokens

### Backend:

- Node.js - Server-side runtime

- Express.js - Web framework for handling API requests

- MySQL - Relational database

- Sequelize - ORM for database operations

- JWT (JSON Web Tokens) - Authentication & security

- bcrypt - Password hashing

---
## Backend Documentation

### Setup Instructions

#### Prerequisites
- Node.js (v16 or later)
- MySQL database
- Environment variables configured in a `.env` file

#### Installation
1. Extract the backend folder.
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Configure the `.env` file with the following variables:
   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=task_management
   JWT_SECRET=your_jwt_secret
   ```
5. Start the backend server:
   ```sh
   nodemon server.js
   ```

### API Endpoints

#### Authentication
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - User login
- **POST /api/auth/logout** - User logout

#### Task Management
- **GET /api/tasks** - Get all tasks
- **POST /api/tasks** - Create a new task
- **GET /api/tasks/:id** - Get a specific task
- **PUT /api/tasks/:id** - Update a task
- **DELETE /api/tasks/:id** - Delete a task

#### Task Progress
- **GET /api/Progress** - Get dashboard statistics

### Database Schema

#### Users Table
| Column  | Type             | Description        |
|---------|----------------|--------------------|
| id      | INT (Primary Key) | Unique user ID |
| name    | VARCHAR(255)    | User's full name  |
| email   | VARCHAR(255)    | User's email address |
| password | VARCHAR(255)   | Hashed password   |

#### Tasks Table
| Column     | Type                           | Description         |
|------------|------------------------------|---------------------|
| id         | INT (Primary Key)             | Unique task ID      |
| title      | VARCHAR(255)                  | Task title         |
| description | TEXT                          | Task details       |
| status     | ENUM('pending', 'in-progress', 'completed') | Task status |
| user_id    | INT (Foreign Key)             | Assigned user      |

### Error Handling

API responses follow this format:
```json
{
  "success": false,
  "message": "Error description here"
}
```

Common errors:
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Invalid credentials
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server failure

---

## Frontend Documentation

### Setup Instructions

#### Prerequisites
- Node.js (v16 or later)
- React Native environment (for mobile)
- API backend running

#### Installation
1. Extract the frontend folder.
2. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

### Key Components

#### Authentication
- **Login Screen** - Allows users to log in
- **Register Screen** - Enables new users to sign up
- **Auth Context** - Manages authentication state

#### Dashboard
- **Task List** - Displays all tasks
- **Task Details** - Shows individual task details

#### Task Management
- **Create Task** - Form to add a new task
- **Edit Task** - Edit an existing task
- **Delete Task** - Remove a task

### API Integration
The frontend communicates with the backend via API calls. Example API call:
```javascript
fetch("https://your-backend-url/api/tasks")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error fetching tasks:", error));
```

### Error Handling
- Displays toast messages for success/errors
- Handles API failures gracefully with retry logic
- Uses loading indicators for network calls

