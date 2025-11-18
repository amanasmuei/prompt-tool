# EasyPrompt - Quick Start Guide

> Get up and running in 5 minutes

---

## 🚀 Fastest Setup (100% Free)

### Step 1: Install Ollama (Free Local AI)

```bash
# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Download from https://ollama.ai/download

# Pull a model
ollama pull llama3.2

# Start Ollama
ollama serve
```

### Step 2: Setup Project

```bash
# Clone repository
git clone <your-repo-url>
cd easyprompt

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
```

### Step 3: Configure .env.local

```env
# Enable Ollama (free, local)
ENABLE_OLLAMA=true
OLLAMA_ENDPOINT=http://127.0.0.1:11434

# Use in-memory rate limiting (dev only)
USE_MEMORY_RATE_LIMIT=true

# Disable other providers for now
ENABLE_ANTHROPIC=false
ENABLE_OPENAI=false
ENABLE_GOOGLE=false
```

### Step 4: Run

```bash
npm run dev
```

Open http://localhost:3000

**You're done!** 🎉 You now have a free, local AI prompt optimizer.

---

## 💳 Add Commercial Providers (Optional)

### Anthropic Claude (Recommended)

```bash
# Get API key from: https://console.anthropic.com
```

Add to `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-api03-...
ENABLE_ANTHROPIC=true
```

### OpenAI GPT

```bash
# Get API key from: https://platform.openai.com/api-keys
```

Add to `.env.local`:
```env
OPENAI_API_KEY=sk-...
ENABLE_OPENAI=true
```

### Google Gemini

```bash
# Get API key from: https://aistudio.google.com/app/apikey
```

Add to `.env.local`:
```env
GOOGLE_API_KEY=...
ENABLE_GOOGLE=true
```

---

## 🔓 Add More Open-Source (Optional)

### Hugging Face (Free Tier)

```bash
# Get API key from: https://huggingface.co/settings/tokens
```

Add to `.env.local`:
```env
HUGGINGFACE_API_KEY=hf_...
ENABLE_HUGGINGFACE=true
```

---

## 🛡️ Production Setup

### 1. Setup Upstash Redis (Rate Limiting)

```bash
# Create account: https://console.upstash.com/
# Create Redis database
# Copy credentials
```

Add to `.env.local`:
```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
USE_MEMORY_RATE_LIMIT=false
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard
# Settings → Environment Variables → Add all from .env.local
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Check code style
npm run lint:fix         # Fix code style issues
npm run type-check       # TypeScript validation
npm run format           # Format with Prettier

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

---

## 📁 Project Structure

```
easyprompt/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home (optimizer)
│   ├── compare/           # Multi-provider comparison
│   ├── providers/         # Provider status
│   ├── guide/             # Best practices
│   └── templates/         # Prompt templates
│
├── components/
│   ├── server/            # Server Components
│   └── client/            # Client Components
│
├── lib/
│   ├── actions/           # Server Actions
│   ├── providers/         # AI Provider adapters
│   │   ├── commercial/    # Anthropic, OpenAI, Google
│   │   └── open-source/   # Ollama, Hugging Face
│   └── prompts/           # System prompts
│
├── proxy.ts               # Rate limiting
├── next.config.ts         # Next.js config
└── .env.local            # Your secrets (DO NOT COMMIT)
```

---

## ❓ Troubleshooting

### Ollama not connecting

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not, start it
ollama serve

# In another terminal, pull a model
ollama pull llama3.2
```

### Rate limit errors in development

Add to `.env.local`:
```env
USE_MEMORY_RATE_LIMIT=true
```

### Build errors

```bash
# Clear cache
rm -rf .next node_modules

# Reinstall
npm install

# Check Node version (needs 20.9.0+)
node --version
```

### API key not working

- Check the key is correct (no extra spaces)
- Check the provider is enabled: `ENABLE_PROVIDER_NAME=true`
- Restart dev server after changing `.env.local`

---

## 📚 Full Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete technical docs
- **[README.md](./README.md)** - Project overview
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute

---

## 🎯 What to Build First

Follow the implementation phases in `ARCHITECTURE.md`:

1. **Phase 1:** Foundation (Next.js setup)
2. **Phase 2:** Provider infrastructure
3. **Phase 3:** Server Actions
4. **Phase 4:** Rate limiting
5. **Phase 5-6:** UI components
6. **Phase 7:** Home page
7. **Phase 8:** Comparison page
8. **Phase 9:** Provider management
9. **Phase 10:** Templates & guide
10. **Phase 11:** Polish
11. **Phase 12:** Advanced features (optional)
12. **Phase 13:** Deploy

---

## 💡 Tips

### For Free/Local Development
- Use Ollama only
- Set `USE_MEMORY_RATE_LIMIT=true`
- No API costs!

### For Production
- Add at least one commercial provider (best quality)
- Setup Upstash Redis (rate limiting)
- Add Hugging Face (free tier alternative)

### For Testing
- Enable multiple providers
- Test comparison feature
- Verify rate limiting works

---

## 🆘 Getting Help

1. Check `ARCHITECTURE.md` for detailed docs
2. Check `CONTRIBUTING.md` for development guide
3. Open GitHub issue for bugs
4. Check GitHub discussions for questions

---

**Ready to build? Run `npm run dev` and start coding!** 🚀
