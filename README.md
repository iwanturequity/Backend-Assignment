# Backend Assignment API

A RESTful API built with Node.js, Express, Prisma, and MySQL with JWT authentication and role-based access control.

## Features

- User registration and authentication
- JWT-based authentication
- Role-based access control (user/admin)
- Password reset functionality
- RESTful API endpoints
- MySQL database with Prisma ORM

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file based on your configuration
4. Set up the database:
```bash
npm run migrate
```
5. Generate Prisma client:
```bash
npm run prisma:generate
```
6. Start the server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL="mysql://username:password@localhost:3306/assignment_backend"
JWT_SECRET="your_jwt_secret_here"
RESET_PASSWORD_SECRET="optional_secret_here"
PORT=3000
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

- `POST /api/auth/login` - Login and get token
  - Body: `{ "email": "john@example.com", "password": "password123" }`

- `POST /api/auth/request-reset` - Request password reset token
  - Body: `{ "email": "john@example.com" }`

- `POST /api/auth/reset-password` - Reset password using token
  - Body: `{ "token": "reset_token", "newPassword": "new_password123" }`

- `GET /api/auth/me` - Get current user information
  - Header: `Authorization: Bearer <token>`

### Admin Routes (requires admin role)

- `GET /api/admin/users` - Get all users
  - Header: `Authorization: Bearer <token>`

- `GET /api/admin/users/:id` - Get user by ID
  - Header: `Authorization: Bearer <token>`

- `PATCH /api/admin/users/:id/role` - Update user role
  - Header: `Authorization: Bearer <token>`
  - Body: `{ "role": "admin" }` or `{ "role": "user" }` 
