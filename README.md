# PrecisionBody Port  
AI‑Powered Auto Body Repair Estimator & Service Portal  
Author: **Catelynn Evans**

## Project Overview
PrecisionBody Port is a full‑stack web application designed for auto body repair shops and customers.  
Users can:

- Browse available auto repair services  
- Generate AI‑powered repair estimates  
- Book appointments  
- Track repair status  
- Manage vehicles  
- View past estimates and appointments  

Admins can:

- Manage customers  
- Approve/deny estimates  
- Manage appointments  
- Oversee the entire workflow  

The platform integrates AI to provide fast, accurate repair estimates based on user‑submitted damage descriptions.

---

## Features

### User Features
- Browse services (public)
- AI‑powered repair estimate generator
- Book repair appointments
- Manage saved vehicles
- View estimate history
- Track repair status
- User authentication (JWT)

### Admin Features
- Manage all appointments
- Approve or reject estimates
- Manage customers
- View all system activity

### AI‑Powered Estimator
Users describe the vehicle damage in natural language.  
The AI returns:

- A repair summary  
- Estimated cost  
- Estimated labor time  
- Additional fees  
- A professional, customer‑friendly explanation  

---

## Tech Stack

### Frontend
- React  
- Vite  
- Tailwind CSS (v4)  
- React Router  
- Axios  
- Vercel (deployment)

### Backend
- Node.js  
- Express  
- MongoDB  
- Mongoose  
- JSON Web Token (JWT)  
- Render (deployment)

### Database
- MongoDB Atlas

---

## MongoDB Models

### **User**
- firstName  
- lastName  
- email  
- password  
- role (user/admin)

### **Vehicle**
- make  
- model  
- year  
- color  
- vin  
- userId

### **Estimate**
- userId  
- vehicleId  
- damageDescription  
- aiEstimateAmount  
- aiSummary  
- status  

### **Appointment**
- userId  
- vehicleId  
- estimateId  
- appointmentDate  
- notes  
- status  
- repairStatus  

---

## Architecture Overview

PrecisionBody Port follows a **modular full‑stack architecture**:

```
Frontend (React + Vite)
    |
    | Axios HTTP Requests
    v
Backend API (Node + Express)
    |
    | Mongoose ORM
    v
MongoDB Atlas (Database)
```

Authentication uses **JWT**, stored in localStorage and passed via Authorization headers.

The frontend is deployed on **Vercel**, backend on **Render**, and both communicate via HTTPS.

---

## Installation & Setup

### 1. Clone the repository
git clone https://github.com/evanscatelynn02/precisionbody-port.git

### 2. Install dependencies

Frontend:
cd client
npm install

Backend:
cd server
npm install

### 3. Environment Variables

#### Backend `.env`
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key

#### Frontend `.env`
VITE_API_URL=https://precisionbody-port-service.onrender.com/api
### 4. Run locally

Frontend:

Backend:

---

## Deployment

**Frontend:** Vercel  
**Backend:** Render  

---

## Live Demo

https://precisionbody-port.vercel.app/

## AI Usage During Development

AI was used to support development in the following ways:

- Assisting with backend debugging  
- Helping structure UI layouts and Tailwind styling  
- Generating estimate logic and formatting  
- Improving UX flow and navigation  
- Refactoring React components  
- Creating documentation (including this README)  

AI acted as a development assistant, while all architectural decisions and implementation were completed by the developer.
