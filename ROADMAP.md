# Project Roadmap

## Future Features

### 🤖 Portfolio Chatbot (Context-Aware AI Assistant)
**Status**: Designed & Prototyped (Stashed)

**Goal**: A floating chat widget powered by Google Gemini (`gemini-1.5-flash`) that answers recruiter questions based on your resume and projects.

**Implementation Details**:
- **Backend**: Express route `/api/chat` with rate limiting and input validation.
- **Context**: `server/src/config/context.ts` defines the system prompt with your profile.
- **Frontend**: `ChatWidget.tsx` floating button and chat interface.
- **Security**: Rate-limited to 5 req/min/IP.

**To Resume Work**:
1.  Apply the git stash: `git stash apply` (look for "Chatbot Implementation").
2.  Install dependencies: `npm install @google/generative-ai express-rate-limit --prefix server`.
3.  Add `GEMINI_API_KEY` to `server/.env`.

---

## Other Ideas
- [ ] Blog/Article Section
- [ ] Dark/Light Mode Toggle (Implemented)
- [ ] Admin Dashboard (Implemented)
