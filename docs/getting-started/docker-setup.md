# Docker Setup Guide

Complete guide for running EasyPrompt with Docker, including database support for user authentication and provider management.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Docker Hub Pre-built Images](#docker-hub-pre-built-images)
3. [Building from Source](#building-from-source)
4. [Database Setup](#database-setup)
5. [Configuration](#configuration)
6. [Docker Commands](#docker-commands)
7. [Troubleshooting](#troubleshooting)
8. [Production Deployment](#production-deployment)

---

## Prerequisites

- **Docker** 20.10+ ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose** 2.0+ (included with Docker Desktop)
- At least **one AI provider** configured

---

## Quick Start

### Option 1: Simple Docker Run (No Database)

**Free & Local (with Ollama):**
```bash
docker run -d -p 3000:3000 \
  -e ENABLE_OLLAMA=true \
  -e OLLAMA_ENDPOINT=http://host.docker.internal:11434 \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:beta
```

**With Anthropic Claude:**
```bash
docker run -d -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-key-here \
  -e ENABLE_ANTHROPIC=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:beta
```

**Multi-Provider (Recommended):**
```bash
docker run -d -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-key \
  -e OPENAI_API_KEY=your-key \
  -e GOOGLE_API_KEY=your-key \
  -e ENABLE_ANTHROPIC=true \
  -e ENABLE_OPENAI=true \
  -e ENABLE_GOOGLE=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:beta
```

Then open: http://localhost:3000

### Option 2: With Database Support (Full Features)

```bash
# Clone the repository
git clone https://github.com/amanasmuei/easyprompt.git
cd easyprompt

# Create environment file
cp .env.example .env.local
# Edit .env.local with your API keys

# Start all services (PostgreSQL + Redis + App)
npm run db:start

# Setup database
npm run setup:dev

# Start development server
npm run dev
```

Open: http://localhost:3000

---

## Docker Hub Pre-built Images

### Available Tags

- `amanasmuei/easyprompt:latest` - Latest stable version
- `amanasmuei/easyprompt:beta` - Beta version (current)
- `amanasmuei/easyprompt:1.0.0-beta.1` - Specific version
- `amanasmuei/easyprompt:1.0` - Major.minor version
- `amanasmuei/easyprompt:1` - Major version

### Quick Docker Run Examples

**Simple Run:**
```bash
docker pull amanasmuei/easyprompt:beta
docker run -d -p 3000:3000 \
  --name easyprompt \
  -e ANTHROPIC_API_KEY=your-key \
  -e ENABLE_ANTHROPIC=true \
  -e USE_MEMORY_RATE_LIMIT=true \
  amanasmuei/easyprompt:beta
```

**With Environment File:**
```bash
docker run -d -p 3000:3000 \
  --name easyprompt \
  --env-file .env.local \
  amanasmuei/easyprompt:beta
```

---

## Building from Source

### Standard Build

```bash
# Clone repository
git clone https://github.com/amanasmuei/easyprompt.git
cd easyprompt

# Create environment file
cp .env.example .env.local

# Build and run with Docker Compose
docker-compose up -d --build
```

### Custom Build

```bash
# Build image
docker build -t easyprompt:custom .

# Run container
docker run -d -p 3000:3000 \
  --env-file .env.local \
  --name easyprompt \
  easyprompt:custom
```

---

## Database Setup

EasyPrompt supports PostgreSQL and Redis for advanced features:

- **PostgreSQL** - User authentication, encrypted API key storage
- **Redis** - Rate limiting, caching

### Quick Database Setup (3 Minutes)

```bash
# 1. Start databases (PostgreSQL + Redis)
npm run db:start

# 2. Setup database tables
npm run setup:dev

# 3. Start application
npm run dev
```

**Services will be available at:**
- **App**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **Prisma Studio**: http://localhost:5555 (run `npm run prisma:studio`)

### Database Management Commands

```bash
# Start/Stop Services
npm run db:start         # Start PostgreSQL + Redis
npm run db:start:tools   # Start with web UIs (PgAdmin, Redis Commander)
npm run db:stop          # Stop containers
npm run db:restart       # Restart containers
npm run db:status        # Check service status

# Database Operations
npm run db:psql          # Connect to PostgreSQL
npm run db:logs          # View database logs
npm run db:backup        # Create database backup
npm run db:clean         # Remove containers (keeps data)
npm run db:reset         # Reset database (deletes data)

# Prisma Operations
npm run prisma:studio    # Visual database editor
npm run prisma:generate  # Regenerate Prisma client
npm run prisma:migrate   # Create/apply migrations
```

### Access Management Tools (Optional)

Start with web management tools:

```bash
npm run db:start:tools
```

**Access points:**
- **PgAdmin**: http://localhost:5050 (Email: admin@easyprompt.local, Password: admin)
- **Redis Commander**: http://localhost:8081 (No auth required)

### Database Configuration

The `docker-compose.dev.yml` file includes:

**PostgreSQL:**
```yaml
postgres:
  image: postgres:16-alpine
  ports:
    - "5432:5432"
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: password
    POSTGRES_DB: easyprompt_dev
```

**Redis:**
```yaml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
```

### Environment Variables for Database

In `.env.local`:
```env
# Database Connection
DATABASE_URL=postgresql://postgres:password@localhost:5432/easyprompt_dev

# Encryption (CHANGE IN PRODUCTION!)
ENCRYPTION_MASTER_KEY=your-64-char-hex-key-here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

**Generate secure keys for production:**
```bash
# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NextAuth secret
openssl rand -base64 32
```

---

## Configuration

### Environment Variables

#### AI Provider Configuration

```env
# Commercial Providers
ANTHROPIC_API_KEY=sk-ant-your-key
OPENAI_API_KEY=sk-your-key
GOOGLE_API_KEY=your-key
ENABLE_ANTHROPIC=true
ENABLE_OPENAI=true
ENABLE_GOOGLE=true

# Open-Source Providers
OLLAMA_ENDPOINT=http://host.docker.internal:11434
ENABLE_OLLAMA=true

HUGGINGFACE_API_KEY=hf_your-key
ENABLE_HUGGINGFACE=true
```

#### Rate Limiting

```env
# Development: Use in-memory
USE_MEMORY_RATE_LIMIT=true

# Production: Use Redis (Upstash or local)
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
USE_MEMORY_RATE_LIMIT=false
```

#### App Configuration

```env
NEXT_PUBLIC_APP_NAME=EasyPrompt
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MAX_PROMPT_LENGTH=5000
LOG_LEVEL=info
DEBUG=false
NODE_ENV=production
```

### Complete Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| **AI Providers** |
| `ANTHROPIC_API_KEY` | No | - | Anthropic Claude API key |
| `OPENAI_API_KEY` | No | - | OpenAI GPT API key |
| `GOOGLE_API_KEY` | No | - | Google Gemini API key |
| `HUGGINGFACE_API_KEY` | No | - | Hugging Face API key |
| `OLLAMA_ENDPOINT` | No | `http://127.0.0.1:11434` | Ollama server endpoint |
| `ENABLE_*` | No | `false` | Enable specific provider |
| **Database** |
| `DATABASE_URL` | For auth | - | PostgreSQL connection string |
| `ENCRYPTION_MASTER_KEY` | For auth | - | 64-char hex encryption key |
| `NEXTAUTH_URL` | For auth | - | Application URL |
| `NEXTAUTH_SECRET` | For auth | - | NextAuth secret key |
| **Rate Limiting** |
| `USE_MEMORY_RATE_LIMIT` | No | `true` | Use in-memory rate limiting |
| `UPSTASH_REDIS_REST_URL` | For prod | - | Upstash Redis URL |
| `UPSTASH_REDIS_REST_TOKEN` | For prod | - | Upstash Redis token |
| **App Config** |
| `NEXT_PUBLIC_APP_NAME` | No | `EasyPrompt` | Application name |
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` | Application URL |
| `NEXT_PUBLIC_MAX_PROMPT_LENGTH` | No | `5000` | Max prompt length |
| `LOG_LEVEL` | No | `info` | Log level |
| `DEBUG` | No | `false` | Debug mode |
| `NODE_ENV` | No | `production` | Node environment |

---

## Using Ollama with Docker

### Option 1: Ollama on Host Machine

```bash
# Install Ollama on your host
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama
ollama serve

# Pull a model
ollama pull llama3.2

# Configure Docker to use host Ollama
# In .env.local:
OLLAMA_ENDPOINT=http://host.docker.internal:11434
ENABLE_OLLAMA=true
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

Then:

```bash
# Start all services
docker-compose up -d

# Pull a model into Ollama container
docker exec -it easyprompt-ollama ollama pull llama3.2

# Verify models
docker exec -it easyprompt-ollama ollama list
```

---

## Docker Commands

### Container Management

```bash
# View logs
docker logs easyprompt
docker logs -f easyprompt  # Follow logs

# Stop/Start/Restart
docker stop easyprompt
docker start easyprompt
docker restart easyprompt

# Remove container
docker rm easyprompt

# Remove image
docker rmi amanasmuei/easyprompt:beta
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

### Health Checks

```bash
# Check container health
docker ps

# Inspect health status
docker inspect --format='{{json .State.Health}}' easyprompt

# Test application
curl http://localhost:3000
curl http://localhost:3000/api/health
```

---

## Troubleshooting

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
# macOS/Windows: Use host.docker.internal
OLLAMA_ENDPOINT=http://host.docker.internal:11434

# Linux: Use host IP
OLLAMA_ENDPOINT=http://172.17.0.1:11434

# Test connection from container
docker exec easyprompt curl http://host.docker.internal:11434/api/tags
```

### Database Connection Issues

```bash
# Check if containers are running
npm run db:status

# Restart database containers
npm run db:restart

# View database logs
npm run db:logs postgres
npm run db:logs redis

# Reset database (WARNING: deletes data)
npm run db:reset
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

### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "8080:3000"  # Use port 8080 instead
```

---

## Production Deployment

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

### Logging Configuration

```yaml
easyprompt:
  logging:
    driver: "json-file"
    options:
      max-size: "10m"
      max-file: "3"
```

### Security Hardening

1. **Don't expose unnecessary ports**
2. **Use non-root user** (already configured in Dockerfile)
3. **Keep images updated**
4. **Scan for vulnerabilities**: `docker scan amanasmuei/easyprompt:beta`
5. **Use secrets management**
6. **Network isolation** with custom networks

### Production Environment Variables

```env
# NEVER use development keys in production!
ENCRYPTION_MASTER_KEY=<64-char-hex-from-crypto>
NEXTAUTH_SECRET=<32-char-base64-from-openssl>
DATABASE_URL=<production-postgres-url>

# Use Upstash Redis for rate limiting
UPSTASH_REDIS_REST_URL=https://your-prod-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-token>
USE_MEMORY_RATE_LIMIT=false

# Production app config
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
LOG_LEVEL=warn
```

---

## Monitoring

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

# Monitor database
npm run db:logs postgres | grep "ERROR"
```

---

## Updates and Maintenance

### Update to Latest Version

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database Backups

```bash
# Create backup
npm run db:backup

# Creates: backup_YYYYMMDD_HHMMSS.sql

# Restore from backup
docker exec -i easyprompt-postgres psql -U postgres easyprompt_dev < backup_file.sql
```

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Ollama Docker](https://hub.docker.com/r/ollama/ollama)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
- [Redis Docker](https://hub.docker.com/_/redis)

---

## FAQ

**Q: Can I use this in production?**
A: Yes, but ensure you configure proper security, logging, and monitoring.

**Q: Which AI provider should I use?**
A: Start with Ollama (free, local) or use commercial providers for higher quality.

**Q: How do I reduce image size?**
A: The multi-stage build already optimizes size. Current image is ~500MB.

**Q: Can I use this without Docker?**
A: Yes, see the main [README.md](./README.md) guide for Node.js setup.

**Q: Do I need a database?**
A: No, the database is optional. It's only needed for user authentication and per-user API key storage.

**Q: How do I backup my data?**
A: Use `npm run db:backup` for database backups. For Docker volumes: `docker run --rm -v ollama-data:/data -v $(pwd):/backup alpine tar czf /backup/ollama-backup.tar.gz /data`

---

**Need Help?** Open an issue on [GitHub](https://github.com/amanasmuei/easyprompt/issues)
