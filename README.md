# Product Management API

RESTful backend API for managing **Users**, **Categories**, and **Products** with JWT authentication, role-based access control (planned), and image upload support.

Built with **Node.js**, **Express**, and **MongoDB** following clean architecture principles.

## Features

- User registration & login (JWT + bcrypt)
- Role-based authorization (admin / user – partially implemented)
- Full CRUD operations for Categories and Products
- Automatic slug generation using `slugify`
- Discount & final price calculation
- Product image upload (main image + multiple images)
- Public read endpoints + protected write endpoints
- Global error handling & request logging
- MongoDB with Mongoose schemas & pre-save hooks

## Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| Node.js        | Runtime                          |
| Express.js     | Web framework                    |
| MongoDB        | Database                         |
| Mongoose       | ODM                              |
| JWT            | Authentication                   |
| bcryptjs       | Password hashing                 |
| Multer         | File uploads (disk storage)      |
| slugify        | URL-friendly slugs               |
| dotenv         | Environment variables            |
| nodemon        | Development auto-reload          |

## Project Structure

product-management-api/
├── src/
│   ├── config/                # db connection
│   ├── controllers/           # business logic handlers
│   ├── middleware/            # auth, error, logger
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoints
│   ├── utils/                 # helpers (catchAsync, apiResponse...)
│   ├── uploads/               # product & category images
│   ├── app.js                 # Express setup
│   └── server.js              # Entry point
│
├── .env                       # (not committed)
├── .env.example
├── .gitignore
├── package.json
└── README.md



## API Endpoints

Base URL: `http://localhost:5000/api` (or your PORT)

### Auth / Login & Register

| Method | Endpoint              | Description                        | Auth Required? |
|--------|-----------------------|------------------------------------|----------------|
| POST   | `/auth/register`      | Register new user                  | No             |
| POST   | `/auth/login`         | Login & receive JWT token          | No             |
| GET    | `/auth`               | Check current authenticated user   | Yes            |

### Categories

| Method | Endpoint                           | Description                           | Auth Required? |
|--------|------------------------------------|---------------------------------------|----------------|
| GET    | `/categories`                      | Get all active categories             | No             |
| GET    | `/categories/:id`                  | Get category by ID                    | No             |
| GET    | `/categories/slug/:slug`           | Get category by slug                  | No             |
| POST   | `/categories`                      | Create new category                   | Yes            |
| PUT    | `/categories/:id`                  | Update category                       | Yes            |
| DELETE | `/categories/:id`                  | Delete category                       | Yes            |
| POST   | `/categories/:id/upload-image`     | Upload category image                 | Yes            |

### Products

| Method | Endpoint                                | Description                           | Auth Required? |
|--------|-----------------------------------------|---------------------------------------|----------------|
| GET    | `/products`                             | Get all active products               | No             |
| GET    | `/products/:id`                         | Get product by ID                     | No             |
| GET    | `/products/slug/:slug`                  | Get product by slug                   | No             |
| POST   | `/products`                             | Create new product                    | Yes            |
| PUT    | `/products/:id`                         | Update product                        | Yes            |
| DELETE | `/products/:id`                         | Delete product                        | Yes            |
| POST   | `/products/:id/upload-main-image`       | Upload main product image             | Yes            |

**Note:** Write operations (POST/PUT/DELETE) are protected with JWT. Admin-only checks are planned for next phase.

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)

Security Notes

Passwords are hashed with bcrypt
JWT tokens for protected routes
Input validation partially implemented (expand with Joi/Zod recommended)
Global error handler in place

Future Improvements

Full admin role-based authorization
Pagination, filtering & search for products/categories
Cloud storage for images (Cloudinary / AWS S3)
Refresh tokens
Order & cart module
API documentation with Swagger
Rate limiting & helmet security headers
Unit/integration tests (Jest + Supertest)

