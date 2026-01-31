# Project Commands

## Setup
To install all dependencies (root, client, and server):
```bash
npm run install:all
```

## Development
To start both client and server simultaneously:
```bash
npm run dev
```

## Structure
- `root`: Orchestration
- `cd client && npm install -D vite@^5.4.11 @vitejs/plugin-react@^4.3.1`
- `client/`: Frontend (Vite)
- `server/`: Backend (Express)

## Deployment
- `git add -A && git commit -m "..." && git push` (code already pushed)
