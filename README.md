# 🏥 HealthCareConnect

HealthCareConnect is a full-stack healthcare web platform that connects **patients**, **doctors**, **nurses**, and **clinic administrators** across Algeria. The app streamlines **appointment scheduling**, **clinic discovery**, **health management**, and **secure communication**, bringing innovation to local healthcare services.

![ HealthCareConnect UI](https://...)

---

## 🚀 Features

### 👨‍⚕️ For Patients
- Sign up / Login securely
- Search clinics based on location, specialty, or condition
- Book appointments with doctors
- View and manage personal health records
- Chat with clinics or doctors (AI assistant coming soon)

### 🏥 For Clinics & Doctors
- Register and get verified
- Add schedules and services
- Accept or decline patient appointments
- Manage profiles and dashboard analytics

### 🧠 AI Assistant (coming soon)
- Integrated Gemini/ChatGPT-powered chatbot for common patient queries

---

## 🧰 Tech Stack

| Frontend        | Backend            | Database      | Auth / Storage        |
|-----------------|--------------------|---------------|------------------------|
| React + Vite    | Node.js + Express  | MongoDB Atlas | JWT + Multer (certs)   |
| Tailwind CSS    | RESTful API        | Mongoose ORM  |                        |
| Netlify (deploy)|                    |               |                        |

---

## 📁 Project Structure

HealthCareConnect/
├── project/ # Frontend (React + Vite)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
├── server/ # Backend (Node.js + Express)
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── index.js
├── .env
└── README.md

### Prerequisites
- Node.js >= 18.x
- MongoDB Atlas account
- MongoDB Compass (optional)
- Netlify (for deployment)

### Clone and Run

# 1. Clone the repository
git clone https://github.com/AbbaciMohamed/MediConnectDz.git
cd MediConnectDz

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Create a .env file in /server
touch ../server/.env
Example .env (server):
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/mediconnect
JWT_SECRET=your_jwt_secret
PORT=5000
Start the servers

# Start backend
cd server
npm run dev

# Start frontend
cd ../project
npm run dev

## 🌍 Deployment
Frontend (Netlify)

In Netlify:

Build Command: vite build

Publish Directory: dist

Environment Variables: Add all VITE_ prefixed vars (e.g. VITE_API_URL)

Backend (Render / Railway / VPS)

## Deploy backend separately using:

Render

Railway

VPS like DigitalOcean or your own server

## 🔐 Security
Passwords are hashed with bcrypt

## Auth uses JWT tokens

Certificates are uploaded securely using Multer

Admins manually verify doctors and clinics

## ✅ Roadmap
 -Registration + JWT Auth

 -Clinic & Doctor dashboard

 -Location-based search

 -AI-powered chatbot (Gemini API)

 -Admin dashboard with analytics

 -Mobile version (PWA)

## 🤝 Contributing
Pull requests and forks are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License
MIT © Mohamed Essadek Abbaci

## 📧 Contact
Made with ❤️ by Mohamed & Team
Email: abbacimohamedessadek@gmail.com
GitHub: github.com/AbbaciMohamed
LinkedIn: linkedin.com/in/mohamed-essadek-abbaci-7abbb3349?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
