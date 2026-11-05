# PhraseFusion

PhraseFusion is a playful, focused language-learning workspace built around short,
textbook-aligned lessons. The first learning paths are English and German at A1 level.

The current frontend includes:
- A learner dashboard with daily goals, XP, streaks, and unit progress
- English and German course switching
- A four-lesson textbook path with locked and completed states
- An interactive exercise modal with answer feedback and hints
- Responsive layouts for desktop and mobile

## Stack
- Frontend: React + Vite
- Backend: Java 21 + Spring Boot
- Database: PostgreSQL
- Local orchestration: Docker Compose

## Initial target
English and German, A1. Lesson content is original practice material structured
around beginner textbook topics; it does not reproduce publisher text.

## Run

### Database
```bash
docker compose up -d postgres
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Deploying the connected app

The frontend and Spring Boot API deploy separately:

1. Deploy `backend` to Render, Railway, Fly.io, or another Docker host using
   `backend/Dockerfile`. The API exposes `/api/health`, `/api/courses`, and
   `/api/progress`.
2. Set `FRONTEND_URL` on the backend to the deployed Vercel URL.
3. The frontend includes `frontend/vercel.json`, which proxies `/api/*` to
   Render. Redeploy Vercel after pulling the latest commit.

The dashboard displays `Live` or `Demo mode` beside the course name so you can
confirm whether the backend is connected.
