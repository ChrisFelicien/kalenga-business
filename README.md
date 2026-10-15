# 📱 Agency Management System (AMS)

A full-stack web application designed to centralize and streamline operations for a telecom and financial services agency (internet package sales, money transfers, phone credit top-ups, etc.).

The system is built to handle multiple workstations simultaneously, powered by a strict and secure **Role-Based Access Control (RBAC 100%)** architecture.

---

## 🚀 Key Features

* 🔐 **100% RBAC & Security**:
  * Secure authentication using JWT (JSON Web Tokens).
  * Fine-grained role management (Admin, Manager, Cashier/Agent) with custom permissions.
  * Protected frontend routes and API endpoints.

* 🖥️ **Multi-Workstation & Cash Register Management**:
  * Workstation-assigned shift sessions.
  * Opening and closing register management (initial balance, end-of-day summary, discrepancy tracking).

* 📊 **Service & Transaction Management**:
  * Fast processing for core services: Money transfers (e.g., Orange Money), Internet package sales, and Airtime/Credit top-ups.
  * Automatic calculation of totals and commissions.
  * Complete audit logging (track who processed each transaction, from which workstation, and when).

* 📈 **Dashboard & Reporting**:
  * Overview of agency performance metrics.
  * Filterable transaction history by workstation, agent, or service type.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework**: [Next.js](https://nextjs.org/) / [React](https://react.dev/)
* **Styling**: Tailwind CSS
* **State & Data Fetching**: React Query / Axios

### **Backend**
* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Authentication & Security**: JWT (JSON Web Tokens), Bcrypt

### **Database**
* **Database**: [MongoDB](https://www.mongodb.com/)
* **ODM**: [Mongoose](https://mongoosejs.com/)

---

## 📁 Project Architecture

```text
├── backend/
│   ├── config/         # Database configuration & constants
│   ├── controllers/    # Business logic for endpoints
│   ├── middleware/     # Auth & RBAC verification middlewares
│   ├── models/         # Mongoose schemas (User, Post, Transaction, Session)
│   ├── routes/         # API routes definitions
│   └── server.js       # Express entry point
│
└── frontend/
    ├── src/
    │   ├── app/        # Next.js pages and layouts (App Router)
    │   ├── components/ # Reusable UI components
    │   ├── context/    # React Contexts (Auth, Session)
    │   ├── services/   # API requests (Axios/Fetch)
    │   └── utils/      # Helper functions and utilities
