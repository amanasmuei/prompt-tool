import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ========================================
// Rate Limiting Configuration
// ========================================

const RATE_LIMIT_REQUESTS = 20 // requests per window
const RATE_LIMIT_WINDOW = '60 s' // 60 seconds

// ========================================
// In-Memory Rate Limiting (Development)
// ========================================

interface RateLimitEntry {
    count: number
    resetTime: number
}

const memoryStore = new Map<string, RateLimitEntry>()

function cleanupMemoryStore() {
    const now = Date.now()
    for (const [key, entry] of memoryStore.entries()) {
        if (now > entry.resetTime) {
            memoryStore.delete(key)
        }
    }
}

// Clean up every minute
setInterval(cleanupMemoryStore, 60000)

async function inMemoryRateLimit(identifier: string): Promise<{
    success: boolean
    limit: number
    remaining: number
    reset: number
}> {
    const now = Date.now()
    const windowMs = 60 * 1000 // 1 minute
    const resetTime = now + windowMs

    const entry = memoryStore.get(identifier)

    if (!entry || now > entry.resetTime) {
        // Create new entry
        memoryStore.set(identifier, {
            count: 1,
            resetTime,
        })

        return {
            success: true,
            limit: RATE_LIMIT_REQUESTS,
            remaining: RATE_LIMIT_REQUESTS - 1,
            reset: resetTime,
        }
    }

    // Increment existing entry
    entry.count++
    const remaining = Math.max(0, RATE_LIMIT_REQUESTS - entry.count)
    const success = entry.count <= RATE_LIMIT_REQUESTS

    return {
        success,
        limit: RATE_LIMIT_REQUESTS,
        remaining,
        reset: entry.resetTime,
    }
}

// ========================================
// Upstash Redis Rate Limiting (Production)
// ========================================

// Initialize Upstash Redis rate limiter if environment variables are set
const useUpstash =
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN &&
    process.env.USE_MEMORY_RATE_LIMIT !== 'true'

const ratelimit = useUpstash
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW),
        analytics: true,
        prefix: 'easyprompt:ratelimit',
    })
    : null

// ========================================
// Rate Limit Function
// ========================================

async function checkRateLimit(identifier: string) {
    if (ratelimit) {
        // Use Upstash Redis in production
        const result = await ratelimit.limit(identifier)
        return {
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset,
        }
    } else {
        // Use in-memory in development
        return await inMemoryRateLimit(identifier)
    }
}

// ========================================
// Middleware (Proxy) Function
// ========================================

export async function proxy(request: NextRequest) {
    // Skip rate limiting for static files and certain paths
    const pathname = request.nextUrl.pathname

    // Paths to skip
    const skipPaths = [
        pathname.startsWith('/_next/static'),
        pathname.startsWith('/_next/image'),
        pathname === '/favicon.ico',
        pathname.startsWith('/api/_next'),
        pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|css|js|woff|woff2|ttf|eot)$/),
    ]

    if (skipPaths.some((skip) => skip)) {
        return NextResponse.next()
    }

    // Get identifier (IP address from headers)
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwarded?.split(',')[0] ?? realIp ?? 'anonymous'
    const identifier = `ip:${ip}`

    try {
        // Check rate limit
        const { success, limit, remaining, reset } = await checkRateLimit(identifier)

        // Prepare response
        let response: NextResponse

        if (!success) {
            // Rate limit exceeded
            response = NextResponse.json(
                {
                    error: 'Too many requests',
                    message: 'You have exceeded the rate limit. Please try again later.',
                    limit,
                    remaining: 0,
                    reset: new Date(reset).toISOString(),
                },
                { status: 429 }
            )
        } else {
            // Allow request
            response = NextResponse.next()
        }

        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', limit.toString())
        response.headers.set('X-RateLimit-Remaining', remaining.toString())
        response.headers.set('X-RateLimit-Reset', new Date(reset).toISOString())

        // Add info header for debugging
        if (process.env.NODE_ENV === 'development') {
            response.headers.set(
                'X-RateLimit-Backend',
                ratelimit ? 'upstash-redis' : 'in-memory'
            )
        }

        return response
    } catch (error) {
        // If rate limiting fails, allow the request but log the error
        console.error('Rate limiting error:', error)
        return NextResponse.next()
    }
}

// ========================================
// Configuration
// ========================================

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder assets
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
