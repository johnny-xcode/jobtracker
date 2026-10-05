# Deploy JobLens to Render

This app is ready to deploy as a single Node web service (backend serves the built React frontend).

## Recommended: Web Service on Render (Free Tier)

### 1. Create a MongoDB Atlas DB (free)
- Go to https://www.mongodb.com/atlas
- Create a free cluster, add your IP to the whitelist (or allow all: 0.0.0.0/0)
- Create a DB user → copy the connection string
- Replace `<password>` (URL-encode special chars)

### 2. Push this repo to GitHub
- Commit all changes: `git add . && git commit -m "ready for render" && git push`

### 3. Deploy to Render
- Go to https://dashboard.render.com/
- New → Web Service → Connect your GitHub repo (select `job-tracker`)
- Render will detect `render.yaml` (rootDir: backend) OR use these settings:
  - Root Directory: `backend`
  - Environment: `Node`
  - Build Command: `npm ci --no-audit --no-fund`
  - Start Command: `node server.js`
  - Plan: Free

### 4. Add environment variables
Add these in Render (sync: false means secret):
- `MONGO_URI` → your Atlas connection string
- `JWT_SECRET` → (already generated, or generate new one)
- `JWT_EXPIRES_IN` → `7d`
- `NODE_ENV` → `production`
- `PORT` → `10000` (Render injects PORT; our server uses it)
- `AI_PROVIDER` → `groq` (recommended free) or `ollama/openrouter/gemini/openai`
- `GROQ_API_KEY` → if using groq (free at https://console.groq.com/keys)
- `SCRAPERAPI_API_KEY` → optional (free at https://www.scraperapi.com)
- `SCRAPERAPI_PREMIUM` → `false`

### 5. Deploy
- Click "Create Web Service" — Render builds backend and the frontend is already built (`frontend/dist` checked in). The backend serves it from `/../../frontend/dist`.

> Note: If you prefer not to commit `frontend/dist`, you can move the build step to Render (build frontend in buildCommand). But committing dist is fine for this single-service deploy.

### 6. Test
- Visit your Render URL (e.g. https://joblens.onrender.com)
- Register/login → add a job (use a Greenhouse/Lever/Ashby link for best extraction)

## Tips
- Free tier sleeps after inactivity (cold start ~30s) — normal.
- For JobStreet/LinkedIn/Indeed, add ScraperAPI key.
- For AI enrichment free, use `AI_PROVIDER=groq` + free key.