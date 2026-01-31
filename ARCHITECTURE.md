# Architecture

This project is a portfolio website with a clear separation between the frontend (Client) and backend (Server).

## High-Level Overview

```mermaid
graph TD
    User[User] -->|HTTPS| Client[Client (React + Vite)]
    Client -->|API Requests| Server[Server (Express + Node.js)]
    Client -->|Auth| Supabase[Supabase (Auth + DB)]
    Server -->|Admin| Supabase
```

## Client (`/client`)
- **Framework**: React with TypeScript, built using Vite.
- **Styling**: Vanilla CSS for a clean, custom look.
- **State Management**: React Context / Hooks.
- **Authentication**: Direct integration with Supabase Auth for Google Sign-In.

## Server (`/server`)
- **Runtime**: Node.js.
- **Framework**: Express.
- **Purpose**: hosting API endpoints and potentially handling secure operations (verified via Supabase tokens in the future).
- **Security**: CORS enabled to allow requests from the client.

## Authentication Flow
1. User clicks "Login with Google" on Client.
2. Supabase handles the OAuth flow with Google.
3. User is redirected back to Client with a session.
4. Client stores the session and adapts the UI.

## Directory Structure
- `client/`: Frontend code.
  - `src/`: Source code.
  - `public/`: Static assets.
- `server/`: Backend code.
  - `src/`: Source code.
