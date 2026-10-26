# Photo Gallery — Celebrare Frontend Assignment

A clean, responsive photo gallery web application built with **React**, **Vite**, and **Tailwind CSS** for the Celebrare React Frontend Intern pre-screening assessment.

---

## 🌟 Key Features

1. **Curated API Integration:** Fetches 30 photos on initial load from the Picsum Photos API (`https://picsum.photos/v2/list?limit=30`).
2. **Custom Hook Architecture (`useFetchPhotos`):** Encapsulates the network lifecycle, loading state, error handling, retry mechanism, and `AbortController` request cancellation.
3. **Responsive Grid Layout:**
   - **Desktop (`lg`):** 4 columns
   - **Tablet (`md`):** 2 columns
   - **Mobile (`sm` / base):** 1 column
4. **Real-time Client-Side Search:** Instant filtering by author name with trimmed, case-insensitive comparison without triggering redundant network requests.
5. **Favourites with `useReducer` & `localStorage`:** State transitions are handled exclusively through `useReducer` with lazy initialization and automatic persistence across browser refreshes.
6. **Performance Optimizations:**
   - `useCallback` stabilizes the search handler callback passed down to child inputs.
   - `useMemo` caches the filtered photo collection, recomputing only when `photos` or the search term changes.
7. **Comprehensive States & Accessibility:**
   - Shimmer skeleton placeholder grid during fetch.
   - User-friendly error card with a functional **"Try Again"** button.
   - Clear empty-state feedback when a search query matches no authors.
   - Accessible labels (`aria-label`, `sr-only`, native `<button>` and `<article>` tags) and high-contrast indicators.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Tooling & Build:** Vite
- **Styling:** Tailwind CSS (utility-first, no external UI component libraries)
- **Icons:** Lightweight inline SVGs
- **API:** [Picsum Photos REST API](https://picsum.photos/)

---

## 📁 Project Structure

```text
celebrare-photo-gallery/
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx          # Main orchestrator (search, grid, states, hooks)
│   │   ├── PhotoCard.jsx        # Individual card (image, photographer, heart toggle)
│   │   └── SearchBar.jsx        # Controlled search input with clear trigger
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom hook handling network requests & abort logic
│   ├── reducers/
│   │   └── favouritesReducer.js # Pure reducer for favourites and localStorage init
│   ├── App.jsx                  # Top-level layout and header
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind directives and base typography
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

### Installation

1. Clone or open the project directory:
   ```bash
   cd Celebrare
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local Vite URL (typically `http://localhost:5173`).

### Production Build

To test the production build:
```bash
npm run build
npm run preview
```

---

## 🧠 Architectural Highlights & Design Decisions

### 1. Custom Hook (`useFetchPhotos`)
All data fetching logic is completely decoupled from the UI. The hook:
- Manages `photos`, `loading`, and `error` states.
- Utilizes `AbortController` within the cleanup return of `useEffect` to avoid race conditions or state updates on unmounted components.
- Exposes a `refetch` function enabling one-click retry if a network error occurs.

### 2. State Management with `useReducer`
As specified in the assignment constraints, favourites are managed strictly using `useReducer` rather than `useState`:
- **Predictable transitions:** A single `TOGGLE_FAVOURITE` action handles adding or removing items immutably.
- **Lazy Initialization:** `initFavourites` is passed as the third parameter to `useReducer`, reading from `localStorage` only once on initial mount rather than evaluating on every re-render.
- **Resilience:** If `localStorage` contains invalid or corrupted JSON, it safely falls back to an empty array without breaking the application.

### 3. Performance Hooks (`useCallback` & `useMemo`)
- **`useCallback` on `handleSearchChange`:** Preserves a stable function reference across renders so child components receiving the handler aren't prompted into unnecessary re-renders.
- **`useMemo` on `filteredPhotos`:** Prevents re-running the array `.filter()` on unrelated re-renders (such as when toggling a favourite item on a photo).

---

## 🎥 5-Minute Video Walkthrough Guide

If presenting or recording a screen walkthrough, follow this structure:

1. **0:00–1:00 — Live Demonstration:**
   - Launch app, show photos loading with skeleton state.
   - Demonstrate responsive layout (desktop 4 cols -> tablet 2 cols -> mobile 1 col).
   - Test real-time search by author name.
   - Favourite a few photos and show the heart button toggle animation.
2. **1:00–1:45 — Custom Hook (`useFetchPhotos.js`):**
   - Highlight the endpoint (`https://picsum.photos/v2/list?limit=30`).
   - Explain how `AbortController` protects against race conditions and how `refetch()` powers the retry button.
3. **1:45–2:45 — `useReducer` & Persistence:**
   - Walk through `favouritesReducer.js`.
   - Explain why `useReducer` keeps state transitions clean.
   - Demonstrate persistence live: reload the browser to show saved favourites remain intact.
4. **2:45–3:30 — `useCallback` & `useMemo`:**
   - Point out `useCallback` on the search handler and `useMemo` for deriving `filteredPhotos`.
   - Explain how it avoids re-filtering 30 items when unrelated state changes.
5. **3:30–4:15 — Responsive Design & Accessibility:**
   - Inspect the Tailwind grid setup.
   - Highlight semantic HTML tags and accessible button labels.
6. **4:15–5:00 — Challenge & Wrap-up:**
   - Mention ensuring lazy initial state loading avoids overwriting saved `localStorage` data during initial render.
