# Ironhouse Fitness Studio — Assignment 3 Assessment Guide

This guide is your presentation cheat sheet for the **Assignment 3 Assessment**. It explains your project architecture, folder structure, database schema, authentication flow, and deployment setup in simple, confident plain English.

---

## 1. Project Overview & Folder Structure

### How the project is split
We separated the project into two distinct directories:
- **`client/`**: The frontend built with React 19, Vite, and Tailwind CSS v4.
- **`server/`**: The backend built with plain Node.js and Express, connecting to a PostgreSQL database hosted on Neon.

```
iron-fitness/
├── client/                     # Frontend (React 19 + Vite + Tailwind v4)
│   ├── public/                 # Static assets (favicons, SVG sprite)
│   ├── src/
│   │   ├── assets/             # Gym photos and branding images
│   │   ├── components/         # Modular React components
│   │   │   ├── AuthModal.jsx   # Login & Signup popup modal with tabs
│   │   │   ├── BookToggle.jsx  # Controlled interest toggle button
│   │   │   ├── ClassCard.jsx   # Individual class card component
│   │   │   ├── Contact.jsx     # Contact info and free trial booking
│   │   │   ├── Footer.jsx      # Navigation links and copyright
│   │   │   ├── GymShowcase.jsx # Facility photo showcase
│   │   │   ├── Header.jsx      # Sticky navbar with dynamic auth status
│   │   │   ├── Hero.jsx        # Landing hero banner
│   │   │   ├── MainContent.jsx # Section wrapper
│   │   │   ├── Membership.jsx  # Dynamic membership pricing tiers
│   │   │   ├── Schedule.jsx    # Class timetable with filters and DB sync
│   │   │   └── Trainers.jsx    # Coach profiles fetched from PostgreSQL
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global session management & token persistence
│   │   ├── data/
│   │   │   └── studio.js       # Fallback local data (Week 2 data)
│   │   ├── api.js              # Centralized fetch calls to the Express API
│   │   ├── App.jsx             # Main layout wrapped in AuthProvider
│   │   ├── index.css           # Tailwind v4 theme tokens and custom utility
│   │   └── main.jsx            # React root mount
│   ├── .env.example            # Example frontend environment variable
│   ├── .gitignore              # Ignores node_modules, dist, .env
│   ├── index.html              # HTML entry point
│   ├── package.json            # Frontend scripts and dependencies
│   └── vite.config.js          # Vite config with local API proxy
│
├── server/                     # Backend (Node.js + Express + PostgreSQL)
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT verification middleware (protects routes)
│   │   ├── routes/
│   │   │   ├── auth.js         # Signup, Login, and Session Verification (/me)
│   │   │   ├── classes.js      # GET /api/classes (with category filtering)
│   │   │   ├── trainers.js     # GET /api/trainers
│   │   │   ├── tiers.js        # GET /api/tiers
│   │   │   └── interests.js    # GET /api/interests & POST toggle
│   │   ├── db.js               # PostgreSQL connection pool using 'pg'
│   │   ├── schema.sql          # Table definitions (Users, Classes, etc.)
│   │   ├── seed.js             # Migrates schema & seeds Week 2 data into DB
│   │   └── server.js           # Main Express server entry point & CORS
│   ├── .env.example            # Template for DB connection string & JWT secret
│   ├── .gitignore              # Strictly ignores .env, node_modules
│   └── package.json            # Server scripts and dependencies
│
├── .gitignore                  # Root gitignore preventing .env leaks
├── package.json                # Root package for running client & server together
└── README.md                   # Full documentation and setup steps
```

---

## 2. Database Schema (Explained in Plain English)

Our database uses PostgreSQL. We have 5 tables that model the gym's operations:

### 1. `users` Table
- **Purpose**: Stores registered members who create accounts on the site.
- **Columns**:
  - `id`: Unique serial number identifying each member (Primary Key).
  - `name`: The member's full name.
  - `email`: The member's email address (marked `UNIQUE` so no duplicates can exist).
  - `password_hash`: The password encrypted using bcrypt (`bcryptjs`). We never store plain text passwords.
  - `created_at`: Automatic timestamp of when the account was registered.

### 2. `classes` Table
- **Purpose**: Stores the weekly workout sessions (Strength, Conditioning, Mobility).
- **Columns**:
  - `id`: A unique slug like `'Mon-06:00'` (Primary Key).
  - `day`: Day of the week (`'Mon'`, `'Tue'`, etc.).
  - `time`: Time slot (`'06:00'`, `'12:15'`, `'17:30'`, `'19:00'`).
  - `name`: Name of the class (`'Strength'`, `'Express HIIT'`, `'Open gym'`).
  - `type`: Category for filtering (`'Strength'`, `'Conditioning'`, `'Mobility'`).

### 3. `trainers` Table
- **Purpose**: Stores the coach profiles shown on the homepage.
- **Columns**:
  - `id`: Unique trainer identifier (e.g. `'logan'`, `'mubeen'`).
  - `initials`: Two-letter badge text (`'LN'`, `'MW'`).
  - `name`: Coach's full name.
  - `role`: Coach title (e.g. `'Head coach · Strength'`).
  - `type`: Coaching specialty matching class types.
  - `bio`: Short description of their coaching philosophy.

### 4. `membership_tiers` Table
- **Purpose**: Stores pricing packages for gym memberships.
- **Columns**:
  - `id`: Package ID (`'off-peak'`, `'all-access'`, `'coached'`).
  - `name`: Tier name.
  - `price`: Monthly rate in Rand (e.g. `'R890'`).
  - `featured`: Boolean indicating whether to highlight as "Most popular".
  - `perks`: JSON array of perk descriptions (e.g. `["Unlimited classes", "Open gym 7 days"]`).

### 5. `user_interests` Table (Relational Junction Table)
- **Purpose**: Connects users to the classes they have marked interest in. This makes authentication meaningful: when a member logs in, their saved timetable picks follow them across devices and persist after refresh.
- **Columns**:
  - `user_id`: Foreign key referencing `users(id)` (with `ON DELETE CASCADE`).
  - `class_id`: Foreign key referencing `classes(id)` (with `ON DELETE CASCADE`).
  - `created_at`: Timestamp when the interest was saved.
  - `PRIMARY KEY (user_id, class_id)`: Ensures a user cannot bookmark the exact same class twice.

---

## 3. How Authentication & Sessions Work

### 1. Registration (`POST /api/auth/signup`)
1. User enters their full name, email, and password (minimum 6 characters).
2. The server checks the `users` table to ensure the email is not already taken.
3. The server uses `bcryptjs` with 10 salt rounds to hash the password securely.
4. The user record is inserted into PostgreSQL.
5. A signed JSON Web Token (JWT) is created containing `{ id, name, email }` and sent back to the frontend.

### 2. Login (`POST /api/auth/login`)
1. User provides email and password.
2. The server finds the user record by email.
3. The server runs `bcrypt.compare()` between the input password and the stored `password_hash`.
4. If valid, a JWT is signed with the server's `JWT_SECRET` and returned. A JWT is signed, not encrypted.

### 3. Session Persistence Across Page Refreshes (`GET /api/auth/me`)
- The JWT is saved in the browser's `localStorage` under the key `'ironhouse_token'`.
- When the user refreshes the browser, `AuthContext.jsx` runs an effect on initial render:
  1. Checks if `ironhouse_token` exists in `localStorage`.
  2. If found, sends a `GET /api/auth/me` request with the header: `Authorization: Bearer <token>`.
  3. The server's `authenticateToken` middleware verifies the cryptographic signature with `jwt.verify()`.
  4. If valid, the user's active session is restored immediately without asking them to log in again.
  5. If the token is invalid or expired, `localStorage` is cleared and the state resets to logged out.

### 4. UI Reaction
- When logged out:
  - Header displays a **"Sign in"** button.
  - Schedule section shows a banner encouraging the user to log in to save their schedule.
- When logged in:
  - Header displays **"Hi, [Name]"** and a **"Sign out"** button.
  - Marking a class as "Interested" automatically sends `POST /api/interests/toggle` to PostgreSQL.

---

## 4. How the Frontend Connects to the Real API

In `client/src/api.js`, all network requests are centralized:
- `VITE_API_URL` determines the backend URL (e.g. `https://ironhouse-api.up.railway.app` in production, or `http://localhost:5000` locally).
- In `Schedule.jsx`, `Trainers.jsx`, and `Membership.jsx`, `useEffect` hooks call `fetchClasses()`, `fetchTrainers()`, and `fetchTiers()` respectively.
- If the live database is connected, a green **"Live PostgreSQL API"** badge appears in the schedule header.
- If the database is still starting up or offline, the components gracefully display local fallback data so the website never crashes.

---

## 5. Security & Environment Variables

- `.env` files are strictly included in `.gitignore` at both the root and subfolder levels:
  - No database connection strings or JWT secrets are ever committed to GitHub.
  - `.env.example` files are provided so anyone cloning the repo knows which variables to provide without exposing credentials.

---

## 6. How to Run Locally

### 1. Install dependencies:
```bash
# In the root folder:
npm install

# In the server folder:
cd server && npm install

# In the client folder:
cd ../client && npm install
```

### 2. Configure Database:
Create `server/.env` and paste your Neon PostgreSQL connection string:
```env
PORT=5000
DATABASE_URL=postgresql://your_neon_url_here?sslmode=require
JWT_SECRET=replace_with_a_long_random_string
CLIENT_URL=http://localhost:5173
```

### 3. Run the Database Seed Script:
```bash
# Inside /server:
npm run seed
```
This automatically executes `schema.sql` (creating all tables) and inserts all the classes, trainers, and membership tiers into PostgreSQL.

### 4. Start the Application:
```bash
# Terminal 1 (Backend API):
cd server && npm run dev

# Terminal 2 (Frontend Client):
cd client && npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 7. Step-by-Step Live Deployment (Railway + Vercel)

### Step A: Free PostgreSQL Database on Neon
1. Go to [neon.tech](https://neon.tech) and create a free account.
2. Create a new project called `ironhouse-db`.
3. Copy your Postgres connection string (looks like `postgresql://user:pass@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require`).
4. Run `npm run seed` locally with that connection string in your `server/.env` to populate the database tables.

### Step B: Deploy Backend to Railway
1. Go to [railway.com](https://railway.com) and log in with GitHub.
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your repository.
4. Set the **Root Directory** to `server`.
5. Under **Variables**, add:
   - `DATABASE_URL`: Your Neon Postgres connection string.
   - `JWT_SECRET`: A secure random secret string.
   - `NODE_ENV`: `production`
6. Under **Settings** → **Networking**, click **Generate Domain** (e.g. `ironhouse-production.up.railway.app`).
7. Test the live health endpoint in your browser: `https://your-railway-url.up.railway.app/api/health`.

### Step C: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New...** → **Project**.
2. Select your repository.
3. In the project setup:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
4. Expand **Environment Variables** and add:
   - `VITE_API_URL`: Your live Railway backend URL (e.g. `https://ironhouse-production.up.railway.app`).
5. Click **Deploy**.
6. When Vercel finishes building, you will have your live public URL!

---

## 8. Answers to Common Assessment Questions

**Q: Where is your database hosted and how does Express talk to it?**  
> *"Our database is PostgreSQL hosted on Neon. In `server/src/db.js`, we use the `pg` package (node-postgres) with a connection pool (`Pool`). It reads `DATABASE_URL` from the `.env` file and executes parameterized SQL queries against the database."*

**Q: Why do you use parameterized queries (`$1, $2`)?**  
> *"To prevent SQL injection attacks. By separating the SQL query structure from user input values, the database driver safely escapes all inputs before executing."*

**Q: How are user passwords stored?**  
> *"We use `bcryptjs` with 10 salt rounds in `server/src/routes/auth.js`. We never store plain text passwords. During login, `bcrypt.compare()` compares the plain text input against the stored one-way hash."*

**Q: How does the user session survive a page refresh?**  
> *"When a user logs in, the server generates a signed JSON Web Token (JWT). The frontend stores this token in `localStorage`. In `AuthContext.jsx`, an effect triggers on mount: if a token exists, it calls `GET /api/auth/me` with the `Authorization: Bearer <token>` header. The server verifies the token signature with `jwt.verify()` and returns the user's data, preserving the logged-in state without re-prompting for credentials."*

**Q: How is the database seeded?**  
> *"We have a script `server/src/seed.js`. When we run `npm run seed`, it reads `schema.sql` to initialize the tables with `CREATE TABLE IF NOT EXISTS`, and then inserts our classes, trainers, and membership tiers using `ON CONFLICT DO UPDATE` so it can be re-run safely at any time."*
