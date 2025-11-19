export class ProviderError extends Error {
    constructor(
        message: string,
        public provider: string,
        public code: string,
        public originalError?: unknown
    ) {
        super(message)
        this.name = 'ProviderError'
    }
}

export class ProviderUnavailableError extends ProviderError {
    constructor(provider: string, message = 'Provider is currently unavailable') {
        super(message, provider, 'PROVIDER_UNAVAILABLE')
        this.name = 'ProviderUnavailableError'
    }
}

export class AuthenticationError extends ProviderError {
    constructor(provider: string, message = 'Invalid API key or authentication failed') {
        super(message, provider, 'AUTHENTICATION_FAILED')
        this.name = 'AuthenticationError'
    }
}

export class RateLimitError extends ProviderError {
    constructor(
        provider: string,
        public retryAfter?: number,
        message = 'Rate limit exceeded'
    ) {
        super(message, provider, 'RATE_LIMIT_EXCEEDED')
        this.name = 'RateLimitError'
    }
}

export class ModelNotFoundError extends ProviderError {
    constructor(provider: string, model: string) {
        super(`Model '${model}' not found`, provider, 'MODEL_NOT_FOUND')
        this.name = 'ModelNotFoundError'
    }
}

export class APIError extends ProviderError {
    constructor(
        provider: string,
        message: string,
        public statusCode?: number,
        originalError?: unknown
    ) {
        super(message, provider, 'API_ERROR', originalError)
        this.name = 'APIError'
    }
}

export class InvalidConfigError extends ProviderError {
    constructor(provider: string, message: string) {
        super(message, provider, 'INVALID_CONFIG')
        this.name = 'InvalidConfigError'
    }
}
