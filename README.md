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
