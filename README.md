# Expense Tracker API

A production-ready RESTful API for a full-stack Expense Tracker application, built with **Node.js**, **Express.js**, and **PostgreSQL**.

The API handles authentication, expense management, budgeting, analytics, recurring expenses, and server-side data processing for the companion React frontend.

---

## Live API

https://expense-tracker-api-production-c311.up.railway.app

## Source Code

https://github.com/rafeeqhassani/expense-tracker-api

---

## Features

- JWT Authentication & Authorization
- Expense CRUD operations
- Budget management
- Analytics & dashboard data
- Category management
- Activity history
- Recurring expense generation
- Search, filtering, sorting & pagination
- Soft delete & restore
- Request validation
- Global error handling
- Swagger API documentation

---

## Technologies

- Node.js
- Express.js
- PostgreSQL (Neon)
- JWT Authentication
- bcrypt
- pg
- Helmet
- CORS
- Morgan
- Swagger
- Jest & Supertest
- GitHub Actions (CI)
- Railway

---

## Architecture

The project follows a layered architecture:

- Routes
- Controllers
- Database Queries
- Middleware
- Utilities
- SQL Migrations

---

## Database

PostgreSQL is used with:

- UUID primary keys
- Foreign keys & cascade deletes
- Database constraints
- Performance indexes
- SQL migration system
- Automatic `updated_at` triggers

---

## Deployment

- Backend deployed on Railway
- Database hosted on Neon PostgreSQL
- Automatic deployments from GitHub

---

## Free Tier Notice

This project uses free-tier hosting services. The API may experience a short cold start after periods of inactivity.

---

## What I Learned

- Designing RESTful APIs
- Express.js architecture
- PostgreSQL schema design
- SQL migrations
- JWT authentication
- Backend security
- Automated testing
- CI with GitHub Actions
- Full-stack application architecture

---

## Future Improvements

- Refresh tokens
- Password reset
- Email verification
- Docker support
- Performance monitoring
- Additional API features
