# AI Language Learning App

Gamified language learning with AI-powered personalization.

## Stack
- Frontend: React + Vite
- Backend: Java 21 + Spring Boot
- Database: PostgreSQL
- Local orchestration: Docker Compose

## Initial target
English → German, A1.

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
