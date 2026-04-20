# 🎓 University Events Management System

A full-stack web application for managing university events and student registrations. The system allows students to browse and register for events, while admins can manage and view all registrations. Built using **Deno, SQLite, HTML, CSS, JavaScript**, following the **MVC architecture pattern**.

---

## 🚀 Tech Stack

- Runtime: Deno
- Database: SQLite
- Frontend: HTML, CSS, JavaScript
- Architecture: MVC (Model–View–Controller)

---

## 📁 Project Overview

This application manages university events and registrations using a relational database structure.

### Core Entities:
- Users (Students & Admin)
- Events
- Registrations (links users to events)

---

## ✨ Features

### 👨‍🎓 Student Features
- Sign up and log in
- Browse all events
- View event details
- Register for events
- View personal registrations
- Cancel registrations

### 🛠️ Admin Features
- Create new events
- Update or Delete existing events
- View all registrations
- Filter registrations by event
- View number of students per event
- View detailed student information per event

---

## ⚙️ Setup Instructions

### 1. Install Deno
Make sure Deno is installed:
https://deno.land/

### 2. Run the project

```bash
deno task serve
```

---

### 3. Access the Application
Once the server is running, open the local URL shown in the terminal (usually something like):
http://localhost:8000

---

## 🔐 Demo Accounts

### 🛠️ Admin Account (Pre-seeded)

Admins cannot be created through the UI for security reasons. A default admin is created using a seed script (`seed-admin.js`).

Username: adminUsername
Password: admin1234567
Name: Admin User
Email: admin@university.com

---

### 👨‍🎓 Student Accounts (Sample Data)

These accounts can be used to test student features:

**Student 1**

Username: student01
Password: student#12345


**Student 2**

Username: student02
Password: securepass123



---

## 🧪 Notes for Testing

- Students can also register a **new account** via the sign-up page.
- Admin accounts are restricted and cannot be created from the UI.
- Each student can register for multiple events.
- Duplicate registrations for the same event are prevented.

---

## 🏗️ Architecture (MVC Pattern)

- **Models** → Handle all database queries (SQLite operations)
- **Views** → Render HTML pages and UI components
- **Controllers** → Handle request logic and connect models with views

---

## 📊 Database Structure

The system uses SQLite with three main tables:

- `users` → stores student and admin accounts
- `events` → stores event details (name, date, location, description, etc.)
- `registrations` → junction table linking users and events (many-to-many relationship)

---

## 🎯 Key Design Highlights

- Many-to-many relationship between users and events
- Role-based authentication (student vs admin)
- Session-based login system
- Dynamic filtering for admin event registrations
- Form validation for student ID, phone number, and year of study
- Clean separation using MVC architecture

---

## 📌 Important Commands

```bash
deno task serve
```

Starts the development server.


👨‍💻 Project Purpose

This project was built as a university assignment to demonstrate:

- Full-stack web development
- Database design using SQLite
- Server-side rendering with Deno
- Authentication and session handling
- MVC architecture implementation
