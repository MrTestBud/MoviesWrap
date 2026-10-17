# MovieWrap Frontend

React + Vite client for the existing Spring Boot MovieWrap API.

## Install

```bash
cd frontend
npm install
```

## Start

1. Start MongoDB and the Spring Boot backend (`backend/moviewrap`, default `http://localhost:8080`).
2. Start the frontend:

```bash
npm run dev
```

The app is served at `http://localhost:5173`.

## Backend URL

Local development uses the Vite proxy. Browser requests to `/api/*` are forwarded to `http://localhost:8080/*` (the `/api` prefix is stripped). This keeps React routes like `/movies` from colliding with the Spring Boot API.

## Environment

Copy `.env.example` if you want a custom API origin.

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | empty | Leave empty to use the Vite proxy. Set to `http://localhost:8080` only if the backend allows CORS. |

## Authentication

1. `POST /auth/register` creates an account (`{ username, password }`).
2. `POST /auth/login` returns a raw JWT string.
3. The token is stored in `localStorage` as `moviewrap_token`.
4. Axios adds `Authorization: Bearer <token>` on every request.
5. Username is read from the JWT `sub` claim. Review forms never send a reviewer name.

JWT lifetime on the backend is 1 hour.
