# 🎓 Student Dashboard Backend

[![Watch the demo](https://img.youtube.com/vi/Njk6LgsVawk/maxresdefault.jpg)](https://youtu.be/Njk6LgsVawk)

A robust backend API for the Anyware Software Full Stack Challenge. This service powers authentication, announcements, user management, quizzes, and more for the student portal application.

---

## 🗂 Folder Structure

```
server/
│
├── src/
│   ├── index.ts        # Main entry point for the backend API
│   ├── controllers/   # Route handler logic for each resource (announcements, users, quizzes)
│   ├── models/        # Mongoose models and schemas for MongoDB collections
│   ├── routes/        # Express route definitions for API endpoints
│   ├── middlewares/   # Custom Express middleware (e.g., JWT validation)
│   ├── services/      # Business logic and service layer
│   ├── utils/         # Utility functions and helpers (e.g., seed scripts)
│   └── Types/         # TypeScript type definitions and interfaces
│
├── Dockerfile         # Docker configuration for containerization
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
└── ...
```

---

## 🚀 Features

- **JWT Authentication** for secure user sessions
- **RESTful APIs** for announcements, quizzes, and users
- **MongoDB with Mongoose** for flexible, schema-based data storage
- **Centralized Error Handling** for consistent API responses
- **Middleware Support** for authentication, validation, and more
- **Socket.IO** for real-time announcement updates
- **Seed Utility** for initial data population

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohamed-Abdellatif/server.git
   cd server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your values (see below).

### (Optional) Seed Initial Data

To populate the database with sample announcements and quizzes, run the seed script (implement a script that calls the exported functions in `src/utils/seedInitialFunctions.ts`).

---

## 🧪 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server (with hot reload):**
   ```bash
   npm run dev
   ```
   > Uses `ts-node-dev` for automatic TypeScript compilation and hot reloading.

---

## 🐳 Running with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t server .
   ```
2. **Run the container:**
   ```bash
   docker run -p 3001:3001 --env-file .env server
   ```

---

## 🔗 API Endpoints

### Authentication

- `POST /user/register` — Register a new user
  - Body: `{ firstName, lastName, email, password }`
- `POST /user/login` — Login and receive JWT
  - Body: `{ email, password }`

### Announcements (JWT required)

- `GET /announcement/all` — Get all announcements
- `GET /announcement/` — Get recent announcements (limit 4)
- `POST /announcement/` — Add a new announcement
  - Body: `{ name, subject, avatar, message }`

### Quizzes (JWT required)

- `GET /quiz/` — Get all quizzes
- `GET /quiz/:quizId` — Get quiz by ID
- `POST /quiz/` — Add a new quiz
  - Body: `{ type, course, details, due, action }`

> All protected routes require an `Authorization: Bearer <token>` header.

---

## 📁 Environment Variables

- `MONGO_DB_URL` – MongoDB connection string (local or cloud)
- `ALLOWED_URL` – Allowed CORS origin for Socket.IO and API (e.g., http://localhost:3000)
- `PORT` – Port number for the Express server (default: 3001)

---

## 📦 Technologies Used

- **Node.js** – JavaScript runtime
- **Express** – Web framework for Node.js
- **TypeScript** – Typed superset of JavaScript
- **Mongoose** – MongoDB object modeling
- **Socket.IO** – Real-time communication
- **Docker** – Containerization

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

> For questions, issues, or contributions, please open an issue or submit a pull request on GitHub.
