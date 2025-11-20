# EasyPrompt

<div align="center">

### AI Prompt Optimization Platform with Multi-Provider Support

Transform your AI prompts from amateur to professional with instant optimization across multiple AI providers.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

[![Status](https://img.shields.io/badge/Status-Beta-green?style=for-the-badge)](./STATUS.md)
[![Tests](https://img.shields.io/badge/Tests-13_Passing-success?style=for-the-badge)](./docs/internal/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](./DEPLOYMENT.md)

[🚀 Quick Start](#quick-start) •
[📖 Documentation](#documentation) •
[✨ Features](#features) •
[🤝 Contributing](./CONTRIBUTING.md) •
[📋 Status](./STATUS.md)

</div>

---

## ✨ Features

### 🤖 Multi-Provider Support

- **Commercial Providers:** Anthropic Claude, OpenAI GPT, Google Gemini
- **Open-Source Providers:** Ollama (local), Hugging Face, Together AI, Replicate
- **7 Total Providers** with unified interface

### ⚡ Core Capabilities

- ✅ **Real-time Prompt Analysis** - Identify issues instantly
- ✅ **Automatic Optimization** - Generate improved versions
- ✅ **Before/After Comparison** - See actual AI responses
- ✅ **Multi-Provider Comparison** - Compare results across providers
- ✅ **Local Model Support** - Run Ollama for complete privacy
- ✅ **Educational Content** - Learn prompt engineering best practices
- ✅ **Provider Health Monitoring** - Real-time status checks
- ✅ **Dynamic Model Discovery** - Auto-detect Ollama models
- ✅ **Rate Limiting** - Built-in abuse protection
- ✅ **Type-Safe** - Full TypeScript implementation

### 🔓 Privacy & Cost

- **Run 100% locally** with Ollama (zero API costs, complete privacy)
- **Free tier** available with Hugging Face
- **Flexible** - Use commercial providers for quality or open-source for cost

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/amanasmuei/easyprompt.git
cd easyprompt
npm install

# Configure (choose at least one provider)
cp .env.example .env.local
# Edit .env.local with your API keys

# Run
npm run dev
```

**Open** [http://localhost:3000](http://localhost:3000)

**📚 New to EasyPrompt?** Read the [**Getting Started Guide**](./GETTING_STARTED.md) for detailed setup instructions.

### Prerequisites

- Node.js 20.9.0+ and npm 10.0.0+
- At least ONE AI provider:
  - 🆓 **Ollama** (free, local, private) - [Setup Guide](./GETTING_STARTED.md#option-1-free--local-ollama-)
  - 💰 **Anthropic/OpenAI/Google** (paid, cloud) - [API Keys](./GETTING_STARTED.md#provider-setup)

---

## Environment Setup

### Option 1: Free & Local (Ollama)

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama3.2

# Start Ollama
ollama serve
```

In `.env.local`:
```env
OLLAMA_ENDPOINT=http://127.0.0.1:11434
ENABLE_OLLAMA=true
```

### Option 2: Commercial Providers

Get API keys from:
- [Anthropic Claude](https://console.anthropic.com)
- [OpenAI](https://platform.openai.com/api-keys)
- [Google AI Studio](https://aistudio.google.com/app/apikey)

In `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...
```

### Option 3: Open-Source Cloud

Get API keys from:
- [Hugging Face](https://huggingface.co/settings/tokens) (free tier)
- [Together AI](https://api.together.xyz)
- [Replicate](https://replicate.com/account/api-tokens)

In `.env.local`:
```env
HUGGINGFACE_API_KEY=hf_...
TOGETHER_API_KEY=...
REPLICATE_API_KEY=r8_...
```

---

## Usage

### Basic Prompt Optimization

1. Visit **EasyPrompt**
2. Select your AI provider
3. Enter your prompt
4. Click "Optimize My Prompt"
5. See optimized version with improvements explained
6. Copy and use!

### Multi-Provider Comparison

1. Go to **Compare** page
2. Enter your prompt
3. Click "Compare Across All Providers"
4. See how different AIs optimize differently
5. Choose the best optimization

### Using Templates

1. Visit **Templates** page
2. Browse categories (Writing, Coding, Analysis, etc.)
3. Click template to use
4. Customize for your needs

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (Turbopack, React 19.2) |
| Language | TypeScript 5.1+ |
| Styling | Tailwind CSS 4 |
| UI Components | Shadcn/UI, Radix UI |
| AI SDKs | Anthropic, OpenAI, Google, Ollama, Hugging Face |
| Rate Limiting | Upstash Redis |
| Deployment | Vercel |

---

## Project Structure

```
easyprompt/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── compare/           # Multi-provider comparison
│   ├── providers/         # Provider status
│   ├── guide/             # Best practices
│   └── templates/         # Prompt templates
├── components/
│   ├── server/            # Server Components
│   └── client/            # Client Components
├── lib/
│   ├── actions/           # Server Actions
│   ├── providers/         # AI Provider adapters
│   │   ├── commercial/    # Anthropic, OpenAI, Google
│   │   └── open-source/   # Ollama, Hugging Face
│   └── prompts/           # System prompts
└── proxy.ts               # Rate limiting
```

---

## Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking
npm run format           # Format with Prettier

# Analysis
npm run analyze          # Analyze bundle size
```

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

**Required:**
- `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` or `GOOGLE_API_KEY` or Ollama running
- `UPSTASH_REDIS_REST_URL` (for rate limiting)
- `UPSTASH_REDIS_REST_TOKEN` (for rate limiting)

**Optional:**
- `HUGGINGFACE_API_KEY`
- `TOGETHER_API_KEY`
- `REPLICATE_API_KEY`

---

## Configuration

### Next.js 16 Features

This project uses the latest Next.js 16 features:

- ✅ **Turbopack** - 10x faster bundling
- ✅ **"use cache"** - Component-level caching
- ✅ **proxy.ts** - Rate limiting (replaces middleware.ts)
- ✅ **React 19.2** - View Transitions
- ✅ **React Compiler** - Automatic memoization

### Rate Limiting

Default: 20 requests per minute per IP

Configure in `proxy.ts`:
```typescript
limiter: Ratelimit.slidingWindow(20, '60 s')
```

---

## 📖 Documentation

### For Users
- **[Getting Started](./GETTING_STARTED.md)** - Complete setup guide for beginners
- **[Project Status](./STATUS.md)** - Current development status
- **[Changelog](./CHANGELOG.md)** - Version history and updates

### For Developers
- **[Architecture](./ARCHITECTURE.md)** - Technical architecture and design
- **[Contributing](./CONTRIBUTING.md)** - How to contribute to the project
- **[Deployment](./DEPLOYMENT.md)** - Production deployment guide

### For Advanced Users
- **[Documentation Index](./docs/)** - All documentation
- **[Internal Docs](./docs/internal/)** - Development reports and analysis

---

## Troubleshooting

### Ollama not connecting

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama
ollama serve

# Pull a model if needed
ollama pull llama3.2
```

### Rate limit errors

- Check Upstash Redis connection
- Verify environment variables
- For development, set `USE_MEMORY_RATE_LIMIT=true`

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 20.9.0+
```

---

## Performance

Target metrics:
- Page Load: < 1.5s
- Optimization Time: < 3s
- Lighthouse Score: 95+
- Mobile Performance: 95+

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](./LICENSE) file for details

---

## Acknowledgments

- Built with [Next.js 16](https://nextjs.org/)
- Powered by [Anthropic Claude](https://anthropic.com), [OpenAI](https://openai.com), [Google Gemini](https://ai.google.dev/), [Ollama](https://ollama.ai), [Hugging Face](https://huggingface.co)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)

---

## Support

- **Issues:** [GitHub Issues](https://github.com/amanasmuei/easyprompt/issues)
- **Discussions:** [GitHub Discussions](https://github.com/amanasmuei/easyprompt/discussions)
- **Documentation:** [Architecture Guide](./ARCHITECTURE.md)

---

**Made with ❤️ for better AI prompts**
