# Ironhouse Fitness Studio — Assignment 4

React 19 + Vite + Tailwind v4 frontend (`client/`) and Node.js + Express + PostgreSQL (Neon) backend (`server/`), with JWT signup/login.

See **ASSESSMENT_GUIDE.md** for the full explanation (schema, auth flow, deployment, Q&A).

## Quick start
1. `npm run install:all`
2. Copy `server/.env.example` to `server/.env` and paste your Neon `DATABASE_URL` + a `JWT_SECRET`.
3. `npm run seed` (creates tables and loads classes, trainers, tiers)
4. `npm run dev` then open http://localhost:5173

The server requires Node.js 20 or newer. To send trial-request emails, add a Gmail address and Google App Password to `SMTP_USER` and `SMTP_PASS` in `server/.env`. For membership payments, configure Stripe test keys and run the Stripe CLI webhook forwarder; see **ASSESSMENT_GUIDE.md** for setup.

## API routes
| Method | Route | Auth | Returns |
|---|---|---|---|
| GET | /api/health | – | DB status |
| GET | /api/classes?type= | – | classes JSON |
| GET | /api/trainers | – | trainers JSON |
| GET | /api/tiers | – | membership tiers JSON |
| POST | /api/trial-requests | – | Saves the request and emails the submitted details |
| POST | /api/checkout | Sign-in required | Creates a pending order and Stripe subscription Checkout Session |
| GET | /api/orders/session/:sessionId | Sign-in required | Current user's order and payment status |
| POST | /api/stripe/webhook | Stripe signature | Confirms completed Checkout payments |
| POST | /api/auth/signup | – | { token, user } |
| POST | /api/auth/login | – | { token, user } |
| GET | /api/auth/me | Bearer | { user } |
| GET | /api/interests | Bearer | saved class ids |
| POST | /api/interests/toggle | Bearer | { classId, interested } |

## Deploy
- Backend: Render, root dir `server`, vars `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL), and `SMTP_USER`/`SMTP_PASS` for trial-request email.
- Also set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` on the backend. The webhook endpoint is `https://your-backend-url/api/stripe/webhook`.
- Frontend: Vercel, root dir `client`, preset Vite, var `VITE_API_URL` (your Render URL).
- GitHub Pages: the `Deploy to GitHub Pages` workflow builds the `client/` app. Set the repository Actions variable `VITE_API_URL` to your deployed backend URL, and include `https://deeno2303-maker.github.io` in the backend's `CLIENT_URL`.

## Check .env is not committed
`git check-ignore server/.env` should print the path. `git ls-files | grep .env` should only show `.env.example` files.
