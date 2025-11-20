# Getting Started with EasyPrompt

Welcome! This guide will help you get EasyPrompt running in minutes.

---

## What is EasyPrompt?

EasyPrompt transforms amateur AI prompts into professional ones instantly. It analyzes your prompts, identifies issues, and generates optimized versions across multiple AI providers.

**Perfect for:**
- Developers using AI APIs
- Content creators working with ChatGPT/Claude
- Anyone who wants better AI responses
- Teams optimizing prompt strategies

---

## Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js 20.9.0+** ([Download](https://nodejs.org/))
- ✅ **npm 10.0.0+** (comes with Node.js)
- ✅ **At least ONE AI provider** (see options below)

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/amanasmuei/easyprompt.git
cd easyprompt
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~650 packages, takes 1-2 minutes).

### Step 3: Set Up Environment

```bash
# Copy the environment template
cp .env.example .env.local

# Open it in your editor
nano .env.local
# or
code .env.local
```

### Step 4: Configure a Provider

Choose ONE option below (you can add more later):

---

## Provider Setup

### Option 1: Free & Local (Ollama) 🆓

**Best for:** Privacy, zero cost, offline usage

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model (e.g., Llama 3.2)
ollama pull llama3.2

# Start Ollama server
ollama serve
```

In `.env.local`:
```env
OLLAMA_ENDPOINT=http://127.0.0.1:11434
ENABLE_OLLAMA=true
```

**Advantages:**
- ✅ Completely free
- ✅ 100% private (runs locally)
- ✅ No API keys needed
- ✅ Works offline

---

### Option 2: Anthropic Claude 🧠

**Best for:** Highest quality responses, advanced reasoning

1. Get API key: [console.anthropic.com](https://console.anthropic.com)
2. Add to `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
ENABLE_ANTHROPIC=true
```

**Pricing:** ~$3-15 per 1M tokens

---

### Option 3: OpenAI GPT 🤖

**Best for:** Most popular, widely supported

1. Get API key: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Add to `.env.local`:

```env
OPENAI_API_KEY=sk-your-key-here
ENABLE_OPENAI=true
```

**Pricing:** ~$0.50-15 per 1M tokens

---

### Option 4: Google Gemini 🌐

**Best for:** Google ecosystem, competitive pricing

1. Get API key: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Add to `.env.local`:

```env
GOOGLE_API_KEY=your-key-here
ENABLE_GOOGLE=true
```

**Pricing:** Free tier available, then ~$0.25-7 per 1M tokens

---

## Running the Application

### Development Mode

```bash
npm run dev
```

**Output:**
```
✓ Starting...
✓ Ready in 1.5s
- Local:   http://localhost:3000
- Network: http://192.168.0.x:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Your First Prompt Optimization

### 1. Open the Application

Navigate to [http://localhost:3000](http://localhost:3000)

### 2. Select a Provider

Choose from the dropdown (e.g., "Ollama" or "Anthropic Claude")

### 3. Enter a Prompt

Try this example:
```
write a blog post about AI
```

### 4. Click "Optimize My Prompt"

EasyPrompt will:
- ✅ Analyze your prompt
- ✅ Identify issues (too vague, missing context)
- ✅ Generate an optimized version
- ✅ Show improvements

### 5. See the Results

You'll see:
- **Quality Score**: 45/100 → 95/100
- **Issues Found**: Lack of specificity, missing audience
- **Optimized Prompt**: Professional version with context
- **Improvements**: Clear explanation of changes

---

## Using Features

### Compare Across Providers

1. Go to [localhost:3000/compare](http://localhost:3000/compare)
2. Enter your prompt
3. Click "Compare Across Providers"
4. See how different AIs optimize differently
5. Choose the best optimization

### Browse Templates

1. Go to [localhost:3000/templates](http://localhost:3000/templates)
2. Browse 7 ready-to-use templates
3. Filter by category (Writing, Coding, Analysis, etc.)
4. Click to copy and customize

### Monitor Provider Health

1. Go to [localhost:3000/providers](http://localhost:3000/providers)
2. See real-time status of all providers
3. Check latency and availability
4. Discover local Ollama models

### Learn Best Practices

1. Go to [localhost:3000/guide](http://localhost:3000/guide)
2. Read prompt engineering principles
3. See good vs bad examples
4. Learn provider-specific tips

---

## Troubleshooting

### Ollama Not Connecting

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not running, start it
ollama serve

# If no models, pull one
ollama pull llama3.2
```

### API Key Errors

- ✅ Check key is correct (no spaces)
- ✅ Verify provider is enabled in .env.local
- ✅ Restart development server after changes

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

---

## Next Steps

### Explore Documentation

- **[README.md](./README.md)** - Project overview
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical details
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guide

### Add More Providers

Edit `.env.local` to add multiple providers:

```env
# Multiple providers for comparison
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...
OLLAMA_ENDPOINT=http://127.0.0.1:11434

# Enable all
ENABLE_ANTHROPIC=true
ENABLE_OPENAI=true
ENABLE_GOOGLE=true
ENABLE_OLLAMA=true
```

### Customize Settings

Edit `lib/constants.ts` for:
- Max prompt length (default: 5000)
- Rate limits (default: 20/min)
- Timeouts and caching

---

## Common Use Cases

### For Developers

```javascript
// Use optimized prompts in your code
const optimized = await optimizePrompt("write a function that...")
// Use the optimized version in your AI API call
```

### For Content Creators

1. Write your prompt in natural language
2. Optimize with EasyPrompt
3. Use optimized version in ChatGPT/Claude
4. Get better results!

### For Teams

1. Share optimized prompts via templates
2. Compare provider results before choosing
3. Monitor provider performance
4. Standardize prompt quality

---

## Support & Community

### Get Help

- **Issues**: [GitHub Issues](https://github.com/amanasmuei/easyprompt/issues)
- **Discussions**: [GitHub Discussions](https://github.com/amanasmuei/easyprompt/discussions)
- **Documentation**: [docs/](./docs/)

### Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## What's Next?

Now that you're set up:

1. ✅ Try optimizing different types of prompts
2. ✅ Compare results across providers
3. ✅ Explore the templates library
4. ✅ Read the guide for best practices
5. ✅ Share feedback or contribute

---

**Happy prompting!** 🚀

Need help? [Open an issue](https://github.com/amanasmuei/easyprompt/issues)
