# SchedulAI

[Live Demo](https://schedule-ai-nishad.netlify.app/)

SchedulAI is a modern, minimal event scheduler web app with AI-powered event categorization. Users can add, view, archive, and delete events. The app automatically categorizes events as Work, Personal, Health, Travel, Finance, or Other using simple AI-like keyword logic, both on the frontend (for live preview) and backend (as the source of truth).

## Features
- Add, view, archive, and delete events
- Auto-categorize events using AI-like keyword logic
- Responsive Trello/whiteboard-inspired UI (dark mode, grid layout)
- Category filter and archive view
- Toast notifications for actions
- Modern date and time pickers

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
# Clone the repo
 git clone <your-repo-url>
 cd Event_manage
```

### 2. Backend Setup
```bash
cd server
cp .env.example .env # or create .env manually
# Fill in DB_USER and DB_PASS in .env
npm install
npm start
```
- The backend will run on `http://localhost:5000` by default.

### 3. Frontend Setup
```bash
cd client
cp .env.example .env # or create .env manually
# Set VITE_SERVER_URL to your backend URL (e.g., http://localhost:5000 or your deployed backend)
npm install
npm run dev
```
- The frontend will run on `http://localhost:5173` by default.

## API Endpoints

### Events
- `GET /events` — Get all events (sorted by date and time ascending)
- `POST /events` — Add a new event (AI categorization applied)
- `PUT /events/:id` — Update an event (e.g., archive)
- `DELETE /events/:id` — Delete an event

### Root
- `GET /` — Health check (returns "Server is running")

## AI Categorization
- The backend uses keyword-based logic to assign a category to each event based on its title and notes.
- The frontend uses the same logic for live category preview as the user types.

**Keyword Examples:**
- **Work:** meeting, project, client, deadline, review
- **Personal:** birthday, family, party, anniversary, friend
- **Health:** doctor, appointment, checkup, medicine, hospital
- **Travel:** flight, hotel, trip, travel, journey
- **Finance:** invoice, payment, salary, bill, finance
- **Other:** (default if no keywords match)

---

## Screenshots

> Home

![Home Page](https://wyo479lt2a.ufs.sh/f/MXg6wu8H2LU8ZmDGtEPSXEazvw40GKLlVSUs2qxRjJu1bPAF)

> Add Event Modal

![Add Event Modal](https://wyo479lt2a.ufs.sh/f/MXg6wu8H2LU8HsVWjN0cS3NoVIghTXlQBRbvtnaesd5HOx1f)

> Mobile View

![Mobile View](https://wyo479lt2a.ufs.sh/f/MXg6wu8H2LU8buex4xFOzQM3SvtuKxayZeNEGo6CF5s748Lq)

[Live Demo](https://schedule-ai-nishad.netlify.app/)