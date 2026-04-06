# 🚀 FinGuard API (Advanced Backend System)

## 📌 Overview

FinGuard API is a backend system designed to manage financial data with secure authentication, role-based access control, and analytics.

This project demonstrates real-world backend concepts including API design, validation, RBAC, pagination, and documentation.

---

## 🔥 Features

* 🔐 JWT Authentication (Register & Login)
* 👥 Role-Based Access Control (Admin, User)
* 💰 Financial Records CRUD (Create, Fetch, Delete)
* 📊 Analytics Summary (Income, Expense, Balance)
* 🔍 Pagination & Filtering support
* 🧹 Clean API Response Structure
* 📘 Swagger API Documentation
* ✅ Input Validation & Error Handling

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Prisma ORM
* SQLite
* JWT Authentication
* Swagger (API Docs)

---

## 📂 Project Structure

```
finguard/
│
├── routes/
├── middleware/
├── prisma/
├── swagger.js
├── server.js
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/finguard-api.git
cd finguard-api
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
JWT_SECRET=your_secret_key
DATABASE_URL=file:./dev.db
```

### 4. Run Prisma

```
npx prisma generate
npx prisma migrate dev
```

### 5. Start server

```
node server.js
```

---

## 🌐 API Documentation (Swagger)

Open in browser:

```
http://localhost:3000/api-docs
```

---

## 📡 API Endpoints

### 🔐 Authentication

* POST `/auth/register` → Register user
* POST `/auth/login` → Login user

---

### 💰 Records

* POST `/records` → Create record
* GET `/records` → Get records (pagination + filter)
* DELETE `/records/:id` → Soft delete record

---

### 📊 Analytics

* GET `/analytics/summary` → Financial summary

---

## 🔑 Authentication

Use Bearer Token in headers:

```
Authorization: Bearer <your_token>
```

---

## 📊 Example Response

```
{
  "success": true,
  "data": {
    "totalIncome": 5000,
    "totalExpense": 2000,
    "balance": 3000
  }
}
```

---

## 🧠 Design Decisions

* Used Prisma ORM for clean and scalable database access
* Implemented JWT for stateless authentication
* Added RBAC for secure role-based access
* Used SQLite for simplicity and quick setup
* Structured responses for consistency
* Integrated Swagger for API documentation

---

## ⚠️ Assumptions

* Each user manages their own financial data
* Email must be unique for each user
* Soft delete is used instead of permanent delete

---

## 🚀 Future Improvements

* Manager-level role with team access
* Advanced analytics (monthly reports)
* Unit & integration testing
* Deployment using Docker

---

## 👨‍💻 Author

Kuldeep

---

## ⭐ Note

This project is built for backend assessment to demonstrate practical backend engineering, structured API design, and real-world problem-solving.
