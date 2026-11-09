<div align="center">

<img src="docs/assets/phrasefusion-logo.png" alt="PhraseFusion logo" width="320">

<br>

### Learn languages through movement, memory, and real practice.

An interactive language-learning platform designed to make German and English practice feel visual, motivating, and effective.

<p>
  <a href="https://phrase-fusion.vercel.app">Live Application</a> ·
  <a href="https://github.com/BallapuramPrakashRoyal/PhraseFusion">Source Code</a>
</p>

![React](https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Deployment](https://img.shields.io/badge/Deployment-Vercel_%2B_Render-black?style=for-the-badge)

</div>

---

## Overview

PhraseFusion is a gamified language-learning web application for learners who want more than passive flashcards. It combines a playful visual interface with a structured learning method:

> **Learn vocabulary → understand grammar → practise every skill → review and repeat**

The application currently focuses on:

- **German A1**, with lessons shaped around the Netzwerk A1 glossary
- **English A1**, with beginner-friendly vocabulary and grammar practice

PhraseFusion uses original explanations, examples, and exercises inspired by textbook topics. It does not reproduce publisher pages.

## Why PhraseFusion?

Most language apps optimize for quick taps. PhraseFusion is designed around deeper recall and practical use:

- Learn words in meaningful phrases
- See grammar patterns in context
- Write what you remember
- Listen to native-language pronunciation
- Speak into the microphone and receive transcript-based validation
- Read short passages and check comprehension
- Review difficult items instead of repeating everything equally

## Product experience

### Playful learning dashboard

The dashboard creates a motivating starting point for every study session:

- Animated 3D vocabulary cube
- Floating phrase bubbles and sparkles
- German-inspired cream, black, red, and gold visual system
- XP, daily streak, progress, stars, and unit completion
- Animated course path with lesson nodes and locked units
- Responsive layout for desktop, tablet, and mobile

### Structured lessons

Every lesson follows a clear three-stage learning journey:

#### 01. Learn vocabulary

- Searchable glossary entries
- German phrase and English meaning
- Contextual emoji visual for every vocabulary item
- Pronunciation button for each phrase
- Full vocabulary banks instead of only a few sample words

#### 02. Learn grammar

- Beginner-friendly grammar explanations
- Articles such as `der`, `die`, and `das`
- Verb patterns such as `sein` and `heißen`
- Formal and informal pronouns
- W-questions
- Negation with `nicht`
- Possessives such as `mein` and `dein`
- Spoken examples for every grammar pattern

#### 03. Practise every skill

The Practice section is generated from the active lesson’s vocabulary and grammar:

| Skill | Experience |
|---|---|
| Writing | Type translations and target words |
| Listening | Hear a phrase and identify its meaning |
| Speaking | Use the microphone and receive transcript validation |
| Reading | Read a phrase or grammar note and answer questions |

Mixed Recall has intentionally been removed so the lesson stays focused on these four core skills.

## Speaking validation

Speaking practice uses the browser’s Web Speech API:

1. The learner selects a target phrase.
2. The app plays a pronunciation model.
3. The learner presses **Speak into mic**.
4. The browser recognizes the spoken phrase.
5. Phrase text is normalized for punctuation, accents, and German `ß`.
6. The transcript is compared with the expected phrase.
7. The learner sees what was heard and receives correct or retry feedback.

German recognition uses `de-DE`; English recognition uses `en-US`. Microphone audio is processed in the browser and is not stored by PhraseFusion. Chrome or Edge is recommended.

## Course content

### German A1 learning path

The current course map contains twelve beginner-focused units:

1. **Guten Tag!** — Greetings and introductions
2. **Freunde, Kollegen und ich** — People, hobbies, and jobs
3. **In der Stadt** — Places and directions
4. **Guten Appetit!** — Food and shopping
5. **Tag für Tag** — Daily routines and time
6. **Zeit mit Freunden** — Plans and free time
7. **Kontakte** — Phones, messages, and appointments
8. **Meine Wohnung** — Home and rooms
9. **Alles Arbeit?** — Work and occupations
10. **Kleidung und Mode** — Clothes, colors, and shopping
11. **Gesund und munter** — Health and wellbeing
12. **Ab in den Urlaub!** — Travel and holidays

Chapter 1 currently has the most complete content coverage, including the expanded glossary, grammar patterns, pronunciation, search, and generated four-skill practice.

## Interface highlights

| Area | Included experience |
|---|---|
| Learn | Course path, unit progress, XP, streaks, and lesson launch |
| Vocabulary | Search, emoji cues, translations, and pronunciation |
| Grammar | Pattern cards, examples, and audio |
| Practice | Writing, listening, speaking, and reading |
| Review words | Mark known vocabulary and revisit due cards |
| Settings | Switch between German and English courses |
| Backend status | Live connection or Demo mode indicator |

## Architecture

```text
┌──────────────────────┐
│  React + Vite App    │
│  Vercel deployment   │
└──────────┬───────────┘
           │ /api proxy
           ▼
┌──────────────────────┐
│ Spring Boot REST API │
│ Render Docker service│
└──────────────────────┘
```

### Frontend

- React and React DOM
- Vite
- Responsive CSS animations
- Browser Speech Synthesis API
- Browser Web Speech Recognition API
- Local storage for learner preferences and counters

### Backend

- Java 21
- Spring Boot 3.5
- Spring Web
- Docker
- CORS configuration for the deployed frontend

## Repository structure

```text
PhraseFusion/
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── vercel.json
│   └── package.json
├── backend/
│   ├── src/main/java/com/languageapp/
│   ├── src/main/resources/application.properties
│   ├── Dockerfile
│   └── pom.xml
├── docker-compose.yml
├── docs/
│   └── MVP-SPEC.md
└── README.md
```

## Production deployment

PhraseFusion is already deployed as two connected services:

### Frontend — Vercel

- Project root: `frontend`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Backend — Render

- Service type: Docker Web Service
- Dockerfile: `backend/Dockerfile`
- Build context: repository root
- Runtime port: Render’s `PORT` environment variable
- Attach a PostgreSQL database and configure `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`

The frontend proxies `/api/*` requests through `frontend/vercel.json` to the Spring Boot service. When the API is unavailable, the interface remains usable with bundled course data and displays **Demo mode**.

## Accounts and authentication

PhraseFusion now supports persistent learner accounts:

- Register with first name, last name, email, and a strong password
- Log in again with the registered email and password
- Passwords are stored only as BCrypt hashes
- Sessions use expiring server-side tokens and can be ended from Settings
- Account tables are created automatically from `backend/src/main/resources/schema.sql`

Authentication endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Create an account and start a session |
| `POST` | `/api/auth/login` | Sign in with email and password |
| `GET` | `/api/auth/me` | Restore the current session |
| `POST` | `/api/auth/logout` | Revoke the current session |

## Connected API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Verify backend availability |
| `GET` | `/api/courses` | Load course metadata |
| `POST` | `/api/progress` | Submit practice correctness |

Practice events currently retain the existing API contract; account-backed progress synchronization remains the next persistence phase.

## Product roadmap

- Complete all twelve German chapters with equal vocabulary and grammar depth
- Build an independent English curriculum
- Persist XP, streaks, review scheduling, and lesson progress
- Add spaced repetition based on recall accuracy
- Improve pronunciation scoring beyond transcript matching
- Add richer grammar writing correction
- Add real community posts and replies
- Add achievements, weekly goals, and learner analytics
- Add lesson-authoring tools for teachers and administrators

## Design principles

- **Active recall over passive scrolling**
- **Small explanations over overwhelming grammar pages**
- **Useful phrases over isolated word lists**
- **Encouraging feedback over punishment**
- **Visual memory cues over plain text**
- **Consistent practice over noisy competition**

## Project status

PhraseFusion is an actively evolving learning product. The core interface, lesson workspace, vocabulary experience, grammar teaching flow, four-skill practice, pronunciation playback, and microphone speaking validation are implemented and deployed.

<div align="center">

### PhraseFusion
#### Make every phrase your own.

</div>
