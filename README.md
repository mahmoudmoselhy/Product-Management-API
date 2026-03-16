# Product Management API

RESTful backend API for managing **Users**, **Categories**, and **Products** with authentication, role-based access control, and image upload functionality.

Built with **Node.js**, **Express**, and **MongoDB** following clean architecture principles.

## Project Overview

This is a capstone backend project that implements a complete REST API for product management system with:

- User registration & login (JWT authentication)
- Role-based authorization (admin & regular user)
- Full CRUD operations for Categories and Products
- Product image upload & static file serving
- Input validation, global error handling, request logging

### Main Entities

- **User**: id, name, email, password (hashed), role (admin/user), createdAt
- **Category**: id, name, description, createdAt
- **Product**: id, name, description, price, image (path), categoryId, createdBy (user id), createdAt

### Relationships

- One Category → Many Products
- One User → Many Products (createdBy)

## Tech Stack

| Layer              | Technology                  |
|--------------------|-----------------------------|
| Runtime            | Node.js (v18+)              |
| Framework          | Express.js                  |
| Database           | MongoDB + Mongoose          |
| Authentication     | JWT + bcrypt                |
| File Upload        | Multer (disk storage)       |
| Validation         | Joi / express-validator     |
| Environment        | dotenv                      |
| Logging            | Morgan (planned)            |
| Dev Tools          | nodemon                     |

## Project Structure

product-management-api/
├── src/
│   ├── config/                # Database & env config
│   ├── controllers/           # Request handlers (thin layer)
│   ├── middleware/            # Auth, error, logger, validation
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   ├── utils/                 # Helpers (apiResponse, catchAsync, etc.)
│   ├── uploads/               # Uploaded product images (static)
│   │   └── products/
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point + DB connection
│
├── .env                       # (not committed)
├── .env.example
├── .gitignore
├── package.json
└── README.md






## API Endpoints (Summary)

### Auth

| Method | Endpoint              | Description                  | Auth   | Role    |
|--------|-----------------------|------------------------------|--------|---------|
| POST   | `/api/auth/register`  | Register new user            | No     | —       |
| POST   | `/api/auth/login`     | Login & get JWT              | No     | —       |

### Categories (protected for write operations)

| Method | Endpoint                | Description                  | Auth   | Role    |
|--------|-------------------------|------------------------------|--------|---------|
| GET    | `/api/categories`       | Get all categories           | No     | —       |
| GET    | `/api/categories/:id`   | Get single category          | No     | —       |
| POST   | `/api/categories`       | Create category              | Yes    | admin   |
| PUT    | `/api/categories/:id`   | Update category              | Yes    | admin   |
| DELETE | `/api/categories/:id`   | Delete category              | Yes    | admin   |

### Products

| Method | Endpoint                      | Description                        | Auth   | Role          |
|--------|-------------------------------|------------------------------------|--------|---------------|
| GET    | `/api/products`               | Get all products (with filters)    | No     | —             |
| GET    | `/api/products/:id`           | Get single product                 | No     | —             |
| POST   | `/api/products`               | Create product                     | Yes    | admin         |
| PUT    | `/api/products/:id`           | Update product                     | Yes    | admin         |
| DELETE | `/api/products/:id`           | Delete product                     | Yes    | admin         |
| POST   | `/api/products/:id/upload-image` | Upload product image            | Yes    | admin         |

### Static Files

- Images: `GET /uploads/products/filename.jpg`

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/mahmoudmoselhy/product-management-api.git
cd product-management-api


Install dependencies

Bashnpm install

Create .env file (copy from example)

Bashcp .env.example .env

Fill in .env values

envPORT=5000
MONGO_URI=mongodb://localhost:27017/product-management
JWT_SECRET=super-secret-key-change-this-in-production-2026
JWT_EXPIRES_IN=30d

Run development server

Bashnpm run dev
Server should be running at: http://localhost:5000
Development Scripts
Bashnpm run dev      # run with nodemon (recommended)
npm start        # production mode
Security Features Implemented

Password hashing with bcrypt
JWT authentication
Role-based access control (admin-only write operations)
Protected routes middleware
Input validation (Joi / express-validator)
Global error handling
(Planned) Rate limiting, helmet, cors configuration

Future Improvements (Roadmap)

Add pagination & filtering for products
Implement refresh tokens
Add order & cart modules
Cloud image storage (Cloudinary)
Unit & integration tests (Jest + Supertest)
API documentation (Swagger / OpenAPI)
Rate limiting & helmet security headers


