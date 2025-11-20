# Docker Deployment Guide

This guide explains how to run EasyPrompt using Docker for easy testing and deployment.

---

## 📋 Prerequisites

- **Docker** 20.10+ ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose** 2.0+ (included with Docker Desktop)
- At least **one AI provider** configured (see options below)

---

## 🚀 Quick Start

### ⚡ Quick Copy-Paste Commands

**Just want to try it quickly?** Copy and run one of these:

```bash
# Free & Local (with Ollama)
docker run -d -p 3000:3000 \
  -e ENABLE_OLLAMA=true \
  -e OLLAMA_ENDPOINT=http://host.docker.internal:11434 \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:latest

# With Anthropic Claude
docker run -d -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-key-here \
  -e ENABLE_ANTHROPIC=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:latest

# Multi-Provider (Recommended)
docker run -d -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-key \
  -e OPENAI_API_KEY=your-key \
  -e GOOGLE_API_KEY=your-key \
  -e ENABLE_ANTHROPIC=true \
  -e ENABLE_OPENAI=true \
  -e ENABLE_GOOGLE=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:latest
```

Then open: http://localhost:3000

---

### Option 1: Pre-built Image from Docker Hub (Fastest) ⚡

```bash
# 1. Pull the image
docker pull amanasmuei/easyprompt:latest

# 2. Run with your API key(s)
# Option A: Single Provider (Anthropic)
docker run -d \
  --name easyprompt \
  -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-key-here \
  -e ENABLE_ANTHROPIC=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:latest

# Option B: Multiple Providers (Recommended)
docker run -d \
  --name easyprompt \
  -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-anthropic-key \
  -e OPENAI_API_KEY=your-openai-key \
  -e GOOGLE_API_KEY=your-google-key \
  -e ENABLE_ANTHROPIC=true \
  -e ENABLE_OPENAI=true \
  -e ENABLE_GOOGLE=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:latest

# Option C: With Ollama (Local) + Commercial
docker run -d \
  --name easyprompt \
  -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-key-here \
  -e ENABLE_ANTHROPIC=true \
  -e OLLAMA_ENDPOINT=http://host.docker.internal:11434 \
  -e ENABLE_OLLAMA=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:latest

# 3. Open browser
open http://localhost:3000
```

**Available Tags:**
- `amanasmuei/easyprompt:latest` - Latest stable version
- `amanasmuei/easyprompt:1.0.0-beta` - Specific version
- `amanasmuei/easyprompt:1.0` - Major.minor version
- `amanasmuei/easyprompt:1` - Major version

### Option 2: Using Docker Compose with Pre-built Image (Recommended)

```bash
# 1. Download docker-compose.yml
curl -O https://raw.githubusercontent.com/amanasmuei/easyprompt/main/docker-compose.yml

# 2. Create environment file
cat > .env.local << EOF
ANTHROPIC_API_KEY=your-key-here
ENABLE_ANTHROPIC=true
EOF

# 3. Start with Docker Compose
docker-compose up -d

# 4. Open browser
open http://localhost:3000
```

### Option 3: Build from Source

```bash
# 1. Clone the repository
git clone https://github.com/amanasmuei/easyprompt.git
cd easyprompt

# 2. Create environment file
cp .env.example .env.local

# 3. Edit .env.local with your API keys
nano .env.local

# 4. Build and start
docker-compose up -d --build

# 5. Open browser
open http://localhost:3000
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with your configuration:

```env
# ========================================
# Commercial AI Providers
# ========================================

# Anthropic Claude (Recommended)
ANTHROPIC_API_KEY=sk-ant-your-key
ENABLE_ANTHROPIC=true

# OpenAI GPT
OPENAI_API_KEY=sk-your-key
ENABLE_OPENAI=true

# Google Gemini
GOOGLE_API_KEY=your-key
ENABLE_GOOGLE=true

# ========================================
# Open-Source Providers
# ========================================

# Ollama (Local - Free)
# Use host.docker.internal to access Ollama on host machine
OLLAMA_ENDPOINT=http://host.docker.internal:11434
ENABLE_OLLAMA=true

# Hugging Face (Cloud - Free tier)
HUGGINGFACE_API_KEY=hf_your-key
ENABLE_HUGGINGFACE=true

# Together AI (Cloud)
TOGETHER_API_KEY=your-key
ENABLE_TOGETHER=true

# Replicate (Cloud)
REPLICATE_API_KEY=r8_your-key
ENABLE_REPLICATE=true

# ========================================
# Rate Limiting
# ========================================

# Development: Use in-memory (no Redis needed)
USE_MEMORY_RATE_LIMIT=true

# Production: Use Upstash Redis
# UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
# UPSTASH_REDIS_REST_TOKEN=your-token
# USE_MEMORY_RATE_LIMIT=false

# ========================================
# App Configuration
# ========================================

# App settings
NEXT_PUBLIC_APP_NAME=EasyPrompt
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MAX_PROMPT_LENGTH=5000

# Debug mode
LOG_LEVEL=info
DEBUG=false
```

**Quick Configuration Examples:**

**Minimal (Free & Local):**
```env
ENABLE_OLLAMA=true
OLLAMA_ENDPOINT=http://host.docker.internal:11434
USE_MEMORY_RATE_LIMIT=true
```

**Best Quality (Commercial):**
```env
ANTHROPIC_API_KEY=sk-ant-xxx
ENABLE_ANTHROPIC=true
OPENAI_API_KEY=sk-xxx
ENABLE_OPENAI=true
USE_MEMORY_RATE_LIMIT=true
```

**Hybrid (Recommended):**
```env
ANTHROPIC_API_KEY=sk-ant-xxx
ENABLE_ANTHROPIC=true
ENABLE_OLLAMA=true
OLLAMA_ENDPOINT=http://host.docker.internal:11434
HUGGINGFACE_API_KEY=hf_xxx
ENABLE_HUGGINGFACE=true
USE_MEMORY_RATE_LIMIT=true
```

### Complete Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| **Commercial Providers** |
| `ANTHROPIC_API_KEY` | No | - | Anthropic Claude API key |
| `OPENAI_API_KEY` | No | - | OpenAI GPT API key |
| `GOOGLE_API_KEY` | No | - | Google Gemini API key |
| `ENABLE_ANTHROPIC` | No | `false` | Enable Anthropic provider |
| `ENABLE_OPENAI` | No | `false` | Enable OpenAI provider |
| `ENABLE_GOOGLE` | No | `false` | Enable Google provider |
| **Open-Source Providers** |
| `OLLAMA_ENDPOINT` | No | `http://127.0.0.1:11434` | Ollama server endpoint |
| `ENABLE_OLLAMA` | No | `true` | Enable Ollama provider |
| `HUGGINGFACE_API_KEY` | No | - | Hugging Face API key |
| `ENABLE_HUGGINGFACE` | No | `false` | Enable Hugging Face provider |
| `TOGETHER_API_KEY` | No | - | Together AI API key |
| `ENABLE_TOGETHER` | No | `false` | Enable Together AI provider |
| `REPLICATE_API_KEY` | No | - | Replicate API key |
| `ENABLE_REPLICATE` | No | `false` | Enable Replicate provider |
| **Rate Limiting** |
| `USE_MEMORY_RATE_LIMIT` | No | `true` | Use in-memory rate limiting (dev) |
| `UPSTASH_REDIS_REST_URL` | No | - | Upstash Redis URL (production) |
| `UPSTASH_REDIS_REST_TOKEN` | No | - | Upstash Redis token (production) |
| **App Configuration** |
| `NEXT_PUBLIC_APP_NAME` | No | `EasyPrompt` | Application name |
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` | Application URL |
| `NEXT_PUBLIC_MAX_PROMPT_LENGTH` | No | `5000` | Max prompt length (chars) |
| `LOG_LEVEL` | No | `info` | Log level (debug/info/warn/error) |
| `DEBUG` | No | `false` | Enable debug mode |
| `NODE_ENV` | No | `production` | Node environment |

**Notes:**
- At least **one provider must be enabled** for the app to function
- Commercial providers require API keys from respective platforms
- Ollama runs locally and needs no API key
- Rate limiting uses in-memory by default (suitable for development)
- For production, use Upstash Redis for distributed rate limiting

### Docker Compose Configuration

The `docker-compose.yml` file includes:

- **EasyPrompt** - Main application (always enabled)
- **Redis** - For rate limiting (optional, commented out)
- **Ollama** - For local AI models (optional, commented out)

---

## 🦙 Using Ollama with Docker

### Option 1: Ollama on Host Machine

```bash
# 1. Install Ollama on your host
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Start Ollama
ollama serve

# 3. Pull a model
ollama pull llama3.2

# 4. Configure Docker to use host Ollama
# In docker-compose.yml, the default endpoint is:
OLLAMA_ENDPOINT=http://host.docker.internal:11434
```

### Option 2: Ollama in Docker

Uncomment the `ollama` service in `docker-compose.yml`:

```yaml
ollama:
  image: ollama/ollama:latest
  container_name: easyprompt-ollama
  ports:
    - "11434:11434"
  volumes:
    - ollama-data:/root/.ollama
```

Then start everything:

```bash
# Start all services
docker-compose up -d

# Pull a model into Ollama container
docker exec -it easyprompt-ollama ollama pull llama3.2

# Verify models
docker exec -it easyprompt-ollama ollama list
```

---

## 🔴 Using Redis for Rate Limiting

Uncomment the `redis` service in `docker-compose.yml`:

```yaml
redis:
  image: redis:7-alpine
  container_name: easyprompt-redis
  ports:
    - "6379:6379"
  volumes:
    - redis-data:/data
```

Update `.env.local`:

```env
USE_MEMORY_RATE_LIMIT=false
UPSTASH_REDIS_REST_URL=http://redis:6379
```

---

## 📦 Docker Commands

### Build & Run

```bash
# Build image
docker build -t easyprompt:latest .

# Run container
docker run -d -p 3000:3000 --name easyprompt easyprompt:latest

# Run with environment file
docker run -d -p 3000:3000 --env-file .env.local --name easyprompt easyprompt:latest
```

### Management

```bash
# View logs
docker logs easyprompt
docker logs -f easyprompt  # Follow logs

# Stop container
docker stop easyprompt

# Start container
docker start easyprompt

# Restart container
docker restart easyprompt

# Remove container
docker rm easyprompt

# Remove image
docker rmi easyprompt:latest
```

### Docker Compose Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild and start
docker-compose up -d --build

# Stop and remove volumes
docker-compose down -v
```

---

## 🔍 Health Checks

### Container Health

```bash
# Check container health
docker ps

# Inspect health status
docker inspect --format='{{json .State.Health}}' easyprompt
```

### Application Health

```bash
# Test application
curl http://localhost:3000

# Check specific endpoints
curl http://localhost:3000/api/health
```

---

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs easyprompt

# Check for port conflicts
lsof -i :3000

# Verify environment variables
docker exec easyprompt env | grep API_KEY
```

### Ollama Connection Issues

```bash
# If using host Ollama on macOS/Windows
OLLAMA_ENDPOINT=http://host.docker.internal:11434

# If using host Ollama on Linux
OLLAMA_ENDPOINT=http://172.17.0.1:11434

# Test connection from container
docker exec easyprompt curl http://host.docker.internal:11434/api/tags
```

### Build Failures

```bash
# Clean build
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
```

### Permission Issues

```bash
# Fix volume permissions
docker-compose down
sudo chown -R $(whoami):$(whoami) .
docker-compose up -d
```

---

## 📊 Production Deployment

### Best Practices

1. **Use environment variables** - Never hardcode API keys
2. **Enable health checks** - Monitor container status
3. **Set resource limits** - Prevent resource exhaustion
4. **Use Redis** - For distributed rate limiting
5. **Enable logging** - Configure log drivers
6. **Use secrets** - For sensitive data in production

### Resource Limits

Add to `docker-compose.yml`:

```yaml
easyprompt:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 2G
      reservations:
        cpus: '0.5'
        memory: 512M
```

### Logging

```yaml
easyprompt:
  logging:
    driver: "json-file"
    options:
      max-size: "10m"
      max-file: "3"
```

---

## 🔒 Security Considerations

1. **Don't expose ports unnecessarily** - Only expose 3000
2. **Use non-root user** - Already configured in Dockerfile
3. **Keep images updated** - Regularly rebuild with latest base images
4. **Scan for vulnerabilities** - Use `docker scan easyprompt:latest`
5. **Use secrets management** - Docker secrets or external vault
6. **Network isolation** - Use custom networks

---

## 🌐 Multi-Provider Setup

Example with all providers:

```yaml
environment:
  # Commercial Providers
  - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
  - OPENAI_API_KEY=${OPENAI_API_KEY}
  - GOOGLE_API_KEY=${GOOGLE_API_KEY}

  # Open Source Providers
  - HUGGINGFACE_API_KEY=${HUGGINGFACE_API_KEY}
  - TOGETHER_API_KEY=${TOGETHER_API_KEY}
  - REPLICATE_API_KEY=${REPLICATE_API_KEY}

  # Local Provider
  - OLLAMA_ENDPOINT=http://ollama:11434

  # Enable all
  - ENABLE_ANTHROPIC=true
  - ENABLE_OPENAI=true
  - ENABLE_GOOGLE=true
  - ENABLE_HUGGINGFACE=true
  - ENABLE_TOGETHER=true
  - ENABLE_REPLICATE=true
  - ENABLE_OLLAMA=true
```

---

## 📈 Monitoring

### Container Stats

```bash
# Real-time stats
docker stats easyprompt

# Resource usage
docker exec easyprompt top
```

### Application Metrics

```bash
# Check response times
time curl http://localhost:3000

# Monitor logs
docker logs -f easyprompt | grep "optimization"
```

---

## 🔄 Updates

### Update to Latest Version

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Rolling Updates

```bash
# Build new image
docker build -t easyprompt:v2 .

# Start new container
docker run -d -p 3001:3000 --name easyprompt-v2 easyprompt:v2

# Test new version
curl http://localhost:3001

# Switch traffic (using nginx/traefik)
# Stop old version
docker stop easyprompt
docker rm easyprompt
```

---

## 💡 Tips & Tricks

### Development Mode

```bash
# Mount source code for live reload
docker run -d \
  -p 3000:3000 \
  -v $(pwd):/app \
  -e NODE_ENV=development \
  easyprompt:latest npm run dev
```

### Custom Port

```bash
# Run on port 8080
docker run -d -p 8080:3000 easyprompt:latest

# Access at http://localhost:8080
```

### Multiple Instances

```bash
# Run multiple instances for load balancing
docker-compose up -d --scale easyprompt=3
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Ollama Docker](https://hub.docker.com/r/ollama/ollama)

---

## ❓ FAQ

**Q: Can I use this in production?**
A: Yes, but ensure you configure proper security, logging, and monitoring.

**Q: Which AI provider should I use?**
A: Start with Ollama (free, local) or use commercial providers for higher quality.

**Q: How do I reduce image size?**
A: The multi-stage build already optimizes size. Use Alpine base images.

**Q: Can I use this without Docker?**
A: Yes, see the main [GETTING_STARTED.md](./GETTING_STARTED.md) guide.

**Q: How do I backup data?**
A: Use volume backups: `docker run --rm -v ollama-data:/data -v $(pwd):/backup alpine tar czf /backup/ollama-backup.tar.gz /data`

---

**Need Help?** Open an issue on [GitHub](https://github.com/amanasmuei/easyprompt/issues)

---

**Last Updated:** 2025-11-20
