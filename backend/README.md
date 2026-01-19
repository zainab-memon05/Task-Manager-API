# 📝 Task Manager REST API

A production-ready **Task Manager REST API** built using **Node.js, Express, MongoDB, and JWT authentication**.  
This project follows a clean **MVC architecture** and provides secure user authentication with full CRUD operations for task management.

---

## 🚀 Features

### 🔐 Authentication
- User registration
- User login
- Password hashing
- JWT-based authentication
- Protected API routes

### ✅ Task Management
- Create tasks
- View all tasks with filters and sorting and pagination
- View a single task
- Update tasks
- Delete tasks

### 🔍 Advanced Filtering & Querying
- Search tasks by title
- Filter by status
- Filter by priority
- Filter by due date range
- Pagination support
- Sorting (ascending / descending)

---

## 🏗️ Project Architecture

```
TaskManager/
│
├── controllers/
│   ├── auth.controllers.js
│   └── task.controllers.js
│
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
│
├── models/
│   ├── users.models.js
│   └── tasks.models.js
│
├── middleware/
│   └── middleware.js
│
├── utils/
|   |-- schemaValidation.js
│   ├── wrapAsync.js
│   └── expressError.js
│
├── app.js
├── .env
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Tokens)**

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
ACCESS_TOKEN_SECRET=your_jwt_secret
```

⚠️ `.env` is intentionally excluded from GitHub for security.

---

## ▶️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/zainab-memon05/Task-Manager-API.git
cd Task-Manager-API
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start MongoDB
Ensure MongoDB is running locally.

### 4️⃣ Run the server
```bash
npm start
```
----

## 📌 API Endpoints

---

## 🔐 Authentication Routes

### ➤ Register User
**POST** `/api/auth/register`

**Request Body**
```json
{
  "user": {
    "name": "Zainab",
    "email": "zainab@example.com",
    "password": "123456"
  }
}
```

**Response**
```json
{
  "message": "User registered successfully"
}
```

---

### ➤ Login User
**POST** `/api/auth/login`

**Request Body**
```json
{
  "user": {
    "email": "zainab@example.com",
    "password": "123456"
  }
}
```

**Response**
```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

## 🔐 Authentication Header

All task-related routes require a JWT token.

```
Authorization: Bearer <JWT_TOKEN>
```

---

## ✅ Task Routes (Protected)

---

### ➤ Create Task
**POST** `/api/tasks`

**Request Body**
```json
{
  "task": {
    "title": "Complete backend project",
    "description": "Finish task manager API",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-01-10"
  }
}
```

**Response**
```json
{
  "message": "Task created"
}
```

---

### ➤ Get All Tasks (With Filters)
**GET** `/api/tasks`

**Optional Query Parameters**
| Parameter | Description |
|--------|------------|
| `title` | Search by task title |
| `status` | Filter by status |
| `priority` | Filter by priority |
| `fromDate` | Start due date |
| `dueDate` | End due date |
| `page` | Page number |
| `limit` | Number of results |
| `sortBy` | Field to sort |
| `order` | `asc` or `desc` |

**Example**
```
/api/tasks?status=pending&priority=high&page=1&limit=5
```

**Response**
```json
{
  "tasks": []
}
```

---

### ➤ Get Single Task
**GET** `/api/tasks/:id`

**Response**
```json
{
  "_id": "taskId",
  "title": "Complete backend project",
  "status": "pending",
  "priority": "high",
  "user": "userId"
}
```

---

### ➤ Update Task
**PUT** `/api/tasks/:id`

**Request Body**
```json
{
  "task": {
    "status": "completed",
    "priority": "medium"
  }
}
```

**Response**
```json
{
  "message": "Task updated"
}
```

---

### ➤ Delete Task
**DELETE** `/api/tasks/:id`

**Response**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 🧠 Concepts Implemented

- RESTful API design
- JWT authentication
- Secure middleware handling
- MVC architecture
- Pagination & sorting
- MongoDB filtering
- Centralized error handling


---

## 👩‍💻 Author

**Zainab**  
Aspiring Backend Developer 

---

## ⭐ Support

If you find this project helpful, please give it a ⭐ on GitHub!
