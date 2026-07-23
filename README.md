# Expense Tracker API

A RESTful backend API for a full-stack expense management application, built with Node.js, Express.js, and PostgreSQL.

The API handles expense management, database operations, filtering, pagination, sorting, and recurring expense processing for the companion React frontend application.

---

## Live API

[https://expense-tracker-api-production-c311.up.railway.app](https://expense-tracker-api-production-c311.up.railway.app)

## Source Code

[https://github.com/rafeeqhassani/expense-tracker-api](https://github.com/rafeeqhassani/expense-tracker-api)

---

## About The Project

Expense Tracker API is the backend service for a full-stack personal finance application.

The backend follows a structured, layered architecture with separate routes, controllers, database queries, middleware, and utility functions.

The project's focus is on understanding real-world backend development: REST API design, database integration, and server-side business logic.

---

## Features

### Expense Management

- Create expenses
- Retrieve expenses
- Update expenses
- Delete expenses
- Restore deleted expenses

### Data Processing

- Server-side pagination
- Filtering
- Sorting
- Database queries
- Expense data transformation

### Advanced Features

- Recurring expense generation
- Request validation
- Error-handling middleware
- PostgreSQL database integration

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Neon PostgreSQL
- `pg` library
- REST API
- Railway deployment
- dotenv
- CORS

---

## Architecture

The backend follows a layered architecture:

- **Routes** — Define API endpoints and handle request routing.
- **Controllers** — Manage application flow and business logic.
- **Database Queries** — Handle PostgreSQL operations separately from controllers.
- **Middleware** — Used for request validation and error handling.

---

## API Endpoints

### Expenses

**Get All Expenses**
Supports pagination, filtering, and sorting.

**Create Expense**

**Update Expense**

**Delete Expense**

---

## Database

The application uses PostgreSQL for persistent storage.

Database responsibilities:

- Store expense records
- Execute queries
- Maintain application data

---

## Frontend Communication

This API is consumed by the React frontend application.

**Frontend handles:**

- UI rendering
- User interaction
- Client-side state management

**Backend handles:**

- Data processing
- Database operations
- Business logic

---

## Deployment

- **Backend** deployed on Railway
- **Database** hosted on Neon PostgreSQL

---

## Free Tier Notice

This project is deployed using free-tier services. Because of free hosting limitations:

- The backend may experience a short cold start after inactivity.
- Initial requests may take longer while services wake up.
- Database resources are limited by the free-tier plan.

---

## What I Learned

### Backend Development

- Building REST APIs with Express.js
- Structuring backend applications
- Connecting applications with PostgreSQL
- Writing database queries
- Handling API errors

### Database

- SQL CRUD operations
- Query-based data retrieval
- Database schema design
- Data migration concepts

### Full Stack Development

- Connecting React applications with backend APIs
- Separating frontend and backend responsibilities
- Moving business logic from frontend to backend

---

## Future Improvements

- Authentication and authorization
- User accounts
- Advanced security features
- Automated testing
- More database optimization

---

## Project Status

Core backend functionality is complete.

**Current improvements in progress:**

- Performance optimization
- Additional security features
- Advanced API capabilities
