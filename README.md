# PhraseFusion

> **Learn a language. Build a habit. Find your voice.**

PhraseFusion is a playful, textbook-aligned language-learning web application for effective beginner practice. It combines a colorful gamified interface with a structured learning loop:

**Learn vocabulary → understand grammar → practise four skills → review again.**

The first learning paths focus on **German A1** and **English A1**, with the German curriculum shaped around the supplied **Netzwerk A1 glossary**. PhraseFusion uses original explanations, examples, and exercises rather than reproducing publisher pages.

## What makes PhraseFusion different?

PhraseFusion is designed to make practice active instead of passive:

- Short lessons built around useful words and real phrases
- Grammar explained in small, usable patterns
- Retrieval practice instead of only reading flashcards
- Writing, listening, speaking, and reading activities in every lesson
- German-aware pronunciation with `de-DE` speech synthesis
- Browser microphone validation for speaking practice
- Visual emoji cues that make vocabulary easier to recognize
- XP, streaks, progress, stars, locked units, and celebratory interactions
- Responsive layouts for desktop, tablet, and mobile

## Current interface

### Playful learning dashboard

- German-inspired cream, black, red, and gold visual system
- Animated 3D vocabulary cube
- Floating phrase bubbles and sparkles
- Animated course path with unit banners, lesson nodes, locks, and stars
- Horizontal top-right controls for streak, settings, profile, and XP
- Live backend or Demo mode status indicator

### Structured lesson workspace

Each lesson is divided into three clear stages:

1. **Learn vocabulary**
   - Full searchable glossary list
   - Emoji or visual representation for each word
   - English meaning
   - Native-language pronunciation button

2. **Learn grammar**
   - Clear grammar rules
   - Example sentences
   - Pronunciation for each example
   - Beginner-friendly explanations

3. **Practise**
   - Writing questions
   - Listening questions with audio playback
   - Speaking questions using the microphone
   - Reading comprehension questions
   - Questions generated from the lesson vocabulary and grammar
   - Immediate feedback, corrections, XP, and retry flow

### Speaking practice

Speaking practice uses the browser Web Speech API:

- German recognition uses `de-DE`
- English recognition uses `en-US`
- The learner presses **Speak into mic**
- The browser transcribes the phrase
- Phrase text is normalized for accents, punctuation, and German `ß`
- The transcript is compared with the target phrase
- The learner sees what the system heard and receives feedback

Microphone audio is processed in the browser and is not stored by the application. Chrome or Edge is recommended.

## Curriculum

The current German course map includes twelve Netzwerk A1-inspired topic units:

1. Guten Tag! — Greetings and introductions
2. Freunde, Kollegen und ich — People, hobbies, and jobs
3. In der Stadt — Places and directions
4. Guten Appetit! — Food and shopping
5. Tag für Tag — Daily routines and time
6. Zeit mit Freunden — Plans and free time
7. Kontakte — Phones, messages, and appointments
8. Meine Wohnung — Home and rooms
9. Alles Arbeit? — Work and occupations
10. Kleidung und Mode — Clothes, colors, and shopping
11. Gesund und munter — Health and wellbeing
12. Ab in den Urlaub! — Travel and holidays

Chapter 1 currently has the deepest content, including the expanded glossary, essential phrases, grammar patterns, pronunciation, search, and complete four-skill practice generation.

## Technology

### Frontend

- React
- Vite
- Browser Speech Synthesis API
- Browser Web Speech Recognition API for microphone practice
- Responsive CSS with animated UI components
- Local storage for language selection, XP, and learning counters

### Backend

- Java 21
- Spring Boot 3.5
- Spring Web
- REST API
- Docker-ready deployment

### Deployment

- Frontend: Vercel
- Backend: Render Docker Web Service
- Frontend API proxy: `frontend/vercel.json`

## Project structure

```text
PhraseFusion/
├── frontend/
│   ├── src/
│   │   ├── main.jsx       # React app, curriculum, lesson logic, practice engine
│   │   └── styles.css     # Dashboard, animations, lesson, and responsive styles
│   ├── vercel.json        # Proxies /api requests to the backend
│   ├── package.json
│   └── index.html
├── backend/
│   ├── src/main/java/
│   │   └── com/languageapp/
│   │       ├── controller/
│   │       └── LanguageLearningApplication.java
│   ├── src/main/resources/application.properties
│   ├── Dockerfile
│   └── pom.xml
├── docker-compose.yml
└── README.md
```

## Run locally

### 1. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

### 2. Start the backend

In another terminal:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The API runs on:

```text
http://localhost:8080
```

### 3. Optional Docker setup

```bash
docker compose up -d
```

The backend reads these environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | Server port |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Check backend availability |
| `GET` | `/api/courses` | Load course metadata |
| `POST` | `/api/progress` | Submit a correctness event |

Example progress request:

```json
{
  "language": "german",
  "correct": true
}
```

The current progress endpoint validates requests and returns `204 No Content`. Persistent user accounts and database-backed progress are planned next.

## Deploy to Vercel and Render

### Backend on Render

Create a **Docker Web Service** connected to this repository:

- **Root Directory:** leave empty
- **Dockerfile Path:** `backend/Dockerfile`
- **Branch:** `main`
- **Environment variable:** `FRONTEND_URL=https://your-frontend-domain.vercel.app`

Render provides a public backend URL such as:

```text
https://phrasefusion-backend.onrender.com
```

### Frontend on Vercel

Create a Vercel project from the repository:

- **Root Directory:** `frontend`
- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

The included `frontend/vercel.json` proxies browser requests from `/api/*` to the Render backend. If the backend is unavailable, the application continues using bundled demo data and displays **Demo mode**.

## Development commands

```bash
# Frontend development server
cd frontend && npm run dev

# Frontend production build
cd frontend && npm run build

# Frontend production preview
cd frontend && npm run preview

# Backend development server
cd backend && ./mvnw spring-boot:run
```

## Roadmap

- Complete all twelve German chapters with full vocabulary, grammar, and practice depth
- Create an independent English curriculum instead of reusing the German chapter map
- Persist users, progress, XP, streaks, and review scheduling in PostgreSQL
- Add authentication and learner profiles
- Add spaced-repetition scheduling based on accuracy and recall interval
- Improve pronunciation scoring with dedicated speech or pronunciation services
- Add grammar-specific writing correction
- Add real community posts and replies
- Add achievements, weekly goals, and richer course analytics
- Add teacher or admin tools for creating lessons

## Content and learning approach

PhraseFusion is built for active beginner learning. It uses textbook-aligned topics as a curriculum reference while presenting original teaching explanations and practice prompts. The goal is to help learners recognize, recall, pronounce, write, and use language in context—not simply complete a streak.

## License

This project is currently maintained as a personal learning application. Add a project license before distributing or deploying it as an open-source product.
