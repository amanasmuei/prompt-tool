# Deployment Guide

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **API Keys** - At least one AI provider API key
3. **Upstash Redis** - For rate limiting in production

---

## Vercel Deployment

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Environment Variables Setup

### Required Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

#### AI Provider Keys (At least ONE required)

```env
# Commercial Providers
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...

# Open Source Providers (optional)
HUGGINGFACE_API_KEY=hf_...
TOGETHER_API_KEY=...
REPLICATE_API_KEY=r8_...
```

#### Rate Limiting (Required for Production)

```env
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

### Optional Variables

```env
# Ollama (for local development only)
OLLAMA_ENDPOINT=http://127.0.0.1:11434

# Feature Flags
ENABLE_ANTHROPIC=true
ENABLE_OPENAI=true
ENABLE_GOOGLE=true
ENABLE_OLLAMA=false

# App Configuration
NEXT_PUBLIC_APP_NAME=EasyPrompt
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_MAX_PROMPT_LENGTH=5000
```

---

## Upstash Redis Setup

### 1. Create Upstash Account

Visit [console.upstash.com](https://console.upstash.com)

### 2. Create Redis Database

- Click "Create Database"
- Choose region closest to your users
- Select "Free" tier (10,000 commands/day)

### 3. Copy Credentials

- Copy "UPSTASH_REDIS_REST_URL"
- Copy "UPSTASH_REDIS_REST_TOKEN"
- Add to Vercel environment variables

---

## Post-Deployment Checklist

- [ ] All environment variables set
- [ ] At least one AI provider configured
- [ ] Upstash Redis connected
- [ ] Rate limiting working (check headers)
- [ ] All pages accessible
- [ ] Provider health checks passing
- [ ] Test prompt optimization
- [ ] Test multi-provider comparison
- [ ] Check error handling

---

## Monitoring

### Check Logs

```bash
vercel logs
```

### Check Analytics

Visit: Vercel Dashboard → Your Project → Analytics

### Rate Limit Headers

Check response headers:
- `X-RateLimit-Limit`: 20
- `X-RateLimit-Remaining`: 19
- `X-RateLimit-Reset`: ISO timestamp

---

## Troubleshooting

### Build Fails

```bash
# Run locally first
npm run build

# Check TypeScript
npm run type-check

# Check tests
npm test
```

### Provider Not Working

1. Verify API key in Vercel settings
2. Check provider health at `/providers`
3. Review function logs in Vercel dashboard

### Rate Limiting Issues

1. Verify Upstash credentials
2. Check Redis connection in logs
3. Fallback to in-memory (dev only):
   ```env
   USE_MEMORY_RATE_LIMIT=true
   ```

---

## Custom Domain

### Add Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for propagation (can take 24-48 hours)

### Update Environment Variable

```env
NEXT_PUBLIC_APP_URL=https://your-custom-domain.com
```

---

## Performance Optimization

### Enable Caching

Already configured in `proxy.ts` with:
- In-memory cache for development
- Redis cache for production

### Monitor Performance

- Lighthouse CI (recommended)
- Vercel Analytics
- Core Web Vitals

Target metrics:
- Page Load: < 1.5s
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

---

## Security

### Headers

Security headers configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Rate Limiting

- 20 requests per minute per IP
- Configured in `proxy.ts`
- Enforced by Upstash Redis

### API Keys

- Never commit to git
- Use Vercel environment variables
- Rotate keys regularly

---

## Scaling

### Free Tier Limits

- **Vercel**: 100GB bandwidth/month
- **Upstash**: 10,000 commands/day

### Upgrade When

- Traffic > 100GB/month
- Rate limit hits > 10,000/day
- Need multiple regions

---

## Support

- **Issues**: [GitHub Issues](https://github.com/amanasmuei/easyprompt/issues)
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Upstash**: [upstash.com/docs](https://docs.upstash.com)
