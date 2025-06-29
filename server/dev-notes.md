# 🏥 MediConnect DZ Backend Setup – Backend Developer 1

## 👨‍💻 Purpose

This backend handles core user functionality for the MediConnect DZ health app in Algeria. It covers:

- 🔐 Authentication (register, login, JWT)
- 👤 User Profile (fetch/edit health info)
- 🩺 Doctor Access Control
- 📅 Appointment Booking
- 🛠️ Admin Tools (seed, export)
- 🧪 API testing setup

---

## 📁 1. Project Folder Structure

Create this clean folder structure focused only on `auth-profile` part of the backend:

```yaml
MediConnectDz/
└── server/
    ├── auth-profile/
    │   ├── controllers/   # Logic for routes
    │   ├── models/        # Mongoose schemas (User, Profile, Appointment)
    │   ├── routes/        # Express route handlers
    │   └── utils/         # JWT, logging, validation
    ├── shared/
    │   ├── middleware/    # JWT auth, error handler
    │   └── db.js          # MongoDB connection logic
    ├── node_modules/      # Installed npm packages
    ├── .env               # Environment variables
    ├── .gitignore
    ├── index.js           # Express entry point
    ├── package.json
```

---

## 📦 2. Required NPM Dependencies

Install the following packages:

```bash
npm install express mongoose cors bcrypt jsonwebtoken dotenv morgan
```

| Package      | Description                        |
|--------------|------------------------------------|
| express      | Core web server framework          |
| mongoose     | MongoDB ODM for schemas            |
| cors         | Enable cross-origin for React      |
| bcrypt       | Hash passwords securely            |
| jsonwebtoken | Create and verify JWT tokens       |
| dotenv       | Load environment secrets           |
| morgan       | Log API requests for debugging     |

---

## 🛠️ 3. Essential Files and Content

### .env
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hospital_db
JWT_SECRET=yourSuperSecretKeyHere
```

### .gitignore
```bash
node_modules/
.env
```

---

## 🔌 4. MongoDB Setup

Install MongoDB locally and run with:

```bash
mongod
```

Use MongoDB Compass (optional) for GUI view.

Verify connection from code (`shared/db.js`) using Mongoose:

```js
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

---

## 🧪 5. Postman / Thunder Client Testing

Create and test the following endpoints:

- `POST /auth/register` – Register users
- `POST /auth/login` – Log in and get JWT
- `GET /profile/:userId` – Fetch profile info
- `POST /appointments/book` – Book appointment

Use Postman Collections for organized testing.

---

## 🧩 6. Middleware Requirements

Create the following in `shared/middleware/`:

- `auth.js`: JWT verification middleware
- `errorHandler.js`: Global error catcher
- `logger.js`: Request logger using morgan

---

## 🔄 7. GitHub Setup

- Initialize Git repo: `git init`
- Add remote origin (your GitHub repo)
- Create feature branch:

```bash
git checkout -b auth-profile
```

---

## 🧠 8. VS Code / Cursor Tools

Install and activate:

| Tool                | Use                        |
|---------------------|----------------------------|
| Prettier            | Code formatting            |
| ESLint              | JS error checking          |
| MongoDB (VS Ext)    | View DB directly           |
| .env Syntax         | Better .env file view      |
| REST Client         | API testing inside VS Code |
| Live Share (Cursor) | Collaborate in real-time   |

---

## ⚙️ 9. Cursor Setup

- Open MediConnectDz in Cursor
- Start a Live Share with your teammate
- Connect GitHub for branching and commits
- Use Cursor's terminal and code chat tools

---

## 📝 10. Optional – Markdown Dev Notes

Create a `dev-notes.md` file documenting:

- Routes and endpoints
- User roles (patient, doctor, admin)
- Sample test data for Postman
- Schema designs (User, Profile, Appointment)
- Day-by-day progress (for hackathon timeline)

---

## ✅ Summary Setup Checklist

| Type                | Status                        |
|---------------------|-------------------------------|
| Folder Structure    | ✅ server/auth-profile, shared/|
| Dependencies        | ✅ Installed                   |
| MongoDB Setup       | ✅ Local DB running            |
| API Testing Tools   | ✅ Postman or Thunder Client   |
| Middleware          | ✅ JWT, errors, logger         |
| Files               | ✅ .env, .gitignore, db.js, index.js |
| IDE Tools           | ✅ Prettier, ESLint, MongoDB Ext|
| GitHub Workflow     | ✅ Branch: auth-profile        |

---

> After this plan, you can proceed to code generation for:
> - User model and JWT functions
> - Auth routes (register/login)
> - MongoDB connection
> - Protected routes for profile and appointments
> - Structure all code into respective folders to match the documentation. 

Use hospital_db
db.users.find().pretty()
db.appointments.find().pretty() 