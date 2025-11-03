# AI Travel Guide — Personalized Tour Planner

A full‑stack web app that generates personalized, day‑by‑day travel itineraries using AI and also provides a gallery of pre‑curated Indian trips.

---

## Project Overview

Two main sections:
- **Itinerary Builder** — User inputs (destination, interests, season, days) → backend AI (Gemini/OpenAI) generates a detailed itinerary. Response is saved to `localStorage` and shown in ItiHome / Timeline.
- **Suggested Trips** — Pre‑curated Indian destinations users can browse. "Plan Trip" pre-fills the itinerary form.

Design: (Tailwind CSS + Vite + React Router).

---

## What’s Done

Frontend
- HomePage (landing) 
- ItineraryForm with loading visualization and API integration
- ItiHome (itinerary overview)
- Timeline (day‑by‑day itinerary + DayCard)
- SuggestedTrips (precurated Indian destinations with filters/search)
- localStorage persistence (`itineraryData`) and event `itineraryUpdated`
- Prefill flow: SuggestedTrips → Create Itinerary (prefill destination)

Backend
- Express server with endpoint:
  - POST `/api/iti/itinerary` — accepts { destination, interests, season, days } and returns generated itinerary
- Gemini/OpenAI integration (service file)
- CORS enabled, JSON parsing, basic route structure

---

## File / Folder Structure (high level)

frontend/
- src/
  - components/
    - HomePage.jsx
    - ItineraryForm.jsx
    - ItiHome.jsx
    - Timeline.jsx
    - SuggestedTrips.jsx
  - data/ (suggestedTripsData.js)
  - App.jsx
  - App.css
backend/
- controllers/
  - itinerary.controller.js
- routes/
  - itinerary.routes.js
- services/
  - gemini.js
- server.js
README.md

---

## Local Setup (Windows)

1. Clone repo and open terminal in project root:

2. Start backend
   ````bash
   cd server
   npm install
   node index.js

2. Start Frontend
   cd frontend
   npm i
   npm run dev

API

POST https://travel-buddy-5wds.onrender.com
Body: JSON { destination, interests, season, days }
Success: returns an itinerary object saved to localStorage key itineraryData

Key Frontend Behaviors

Generated itinerary stored at localStorage.getItem('itineraryData').
To create a fresh itinerary:
Use "Create New Itinerary" in ItiHome / Timeline / Home — clears itineraryData, dispatches itineraryUpdated, then navigates to the form.
SuggestedTrips → "Plan Trip" clears old data and navigates to form with prefillDestination in navigation state.
App listens for itineraryUpdated and storage events and reloads state from localStorage.

Notes & Credits
UI built with React + Vite + Tailwind CSS.
AI integration uses Gemini / OpenAI — add API keys to .env.

````
