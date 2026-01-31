# Portfolio Project Architecture

This document explains the architecture of the portfolio website project.

## Overview

The project is divided into two main parts:
1. **Client**: A React application built with Vite and TypeScript.
2. **Server**: A Node.js application using Express and TypeScript.

Authentcation is handled by **Supabase** (Google OAuth).

## Directory Structure

```
.
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, etc.)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── hooks/          # Custom Hooks (useAuth)
│   │   ├── pages/          # Page components (Home, Dashboard)
│   │   ├── supabase.ts     # Supabase client configuration
│   │   ├── setupTests.ts   # Test configuration
│   │   └── App.tsx         # Main Application component with Routing
│   ├── vite.config.ts      # Vite and Vitest configuration
│   └── ...
├── server/                 # Backend Application
│   ├── src/
│   │   ├── app.ts          # Express app definition (for testing)
│   │   ├── index.ts        # Server entry point
│   │   └── api.test.ts     # Integration tests
│   └── ...
└── ...
```

## Key Technologies

- **Frontend**: React, Vite, TypeScript, Vanilla CSS.
- **Backend**: Node.js, Express, TypeScript.
- **Auth**: Supabase (via `@supabase/supabase-js`).
- **Testing**: Vitest (Frontend & Backend), Supertest (Backend API testing), Happy-DOM (Frontend environment).

## Authentication Flow

1. **Login**: User clicks "Sign In" in the Navbar.
2. **Supabase**: `useAuth` hook calls `supabase.auth.signInWithOAuth({ provider: 'google' })`.
3. **Redirect**: User is redirected to Google, then back to the app.
4. **Session**: `AuthContext` detects the session and updates the `user` state.
5. **Protection**: `ProtectedRoute` component in `App.tsx` prevents access to `/dashboard` without a session.

## Setup Instructions

1. **Environment Variables**:
   - Create `.env` in `client/` with:
     ```
     VITE_SUPABASE_URL=your_project_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```
2. **Install Dependencies**:
   - `cd client && npm install`
   - `cd server && npm install`
3. **Run Development Servers**:
   - Client: `npm run dev` (in `client/`)
   - Server: `npm run dev` (in `server/`)
4. **Run Tests**:
   - Client: `npm test` (in `client/`)
   - Server: `npm test` (in `server/`)
