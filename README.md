# ZenithFit - Fitness & Gym Management Platform

## Project Overview

ZenithFit is a modern Fitness & Gym Management Platform designed for fitness enthusiasts, trainers, and administrators. Users can explore fitness classes, book sessions, save favorite classes, join community discussions, and track their fitness journey. Trainers can manage classes and publish forum content, while administrators oversee the entire platform through role-based management tools.

---

## 🌐 Live Links

https://zenithfit-fitness-and-gym.vercel.app

---

## ✨ Key Features

### Authentication & Security

- Better Auth Authentication
- Email & Password Login
- Google Login
- JWT Authentication
- HTTPOnly Cookie Security
- Protected Routes
- Role-Based Access Control (RBAC)
- Environment Variable Protection

### User Features

- Browse approved fitness classes
- Search classes by name
- Filter classes by category
- View class details
- Add classes to favorites
- Stripe payment integration
- Book fitness classes
- Track booked classes
- Apply as trainer
- View trainer application status
- Participate in community discussions
- Like and dislike forum posts
- Create, edit, and delete comments

### Trainer Features

- Create fitness classes
- Manage personal classes
- Update class information
- Delete classes
- View enrolled students
- Create forum posts
- Manage own forum content

### Admin Features

- Manage all users
- Block and unblock users
- Promote users to admin
- Approve or reject trainer applications
- Provide trainer application feedback
- Demote trainers
- Manage all classes
- Approve, reject, or delete classes
- Manage community forum posts
- Monitor transactions

### Community Forum

- Public forum feed
- Detailed post view
- Like and dislike system
- Comment management
- Trainer and admin content publishing

### Payment System

- Stripe Checkout Integration
- Secure online payments
- Booking validation
- Duplicate booking prevention
- Transaction history tracking

---

## 🔍 Advanced Functionalities

### Search Functionality

Users can search classes by class name using MongoDB `$regex`.

### Filter Functionality

Users can filter classes by category using MongoDB `$in`.

### Pagination

Server-side pagination implemented for:

- All Classes Page
- Community Forum Page

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Next.js
- Tailwind CSS
- Hero UI
- Framer Motion
- React Toastify
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Better Auth
- CORS
- Dotenv

### Database

- MongoDB Atlas

---

## 📦 NPM Packages Used

### Client

```bash
react
next
mongodb
better-auth/mongo-adapter
react-icons
gravity-ui/icons
heroui/react
iconify/react
framer-motion
lucide-react
recharts
better-auth
@stripe
@stripe/stripe-js
tailwindcss
react-toastify
```

### Server

```bash
express
mongodb
jwt
cors
dotenv
jose-cjs
```

---
