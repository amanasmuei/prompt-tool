import { AIProvider } from './base'
import { ProviderType, ProviderInfo, HealthStatus } from './types'
import { ProviderUnavailableError } from './errors'

// Import providers (will be uncommented as they are implemented)
import { AnthropicProvider } from './commercial/anthropic'
import { OpenAIProvider } from './commercial/openai'
import { GoogleProvider } from './commercial/google'
import { OllamaProvider } from './open-source/ollama'
// import { HuggingFaceProvider } from './open-source/huggingface'

class ProviderFactory {
    private static instance: ProviderFactory
    private providers: Map<ProviderType, AIProvider> = new Map()

    private constructor() {
        // Initialize providers
        this.registerProvider(new AnthropicProvider())
        this.registerProvider(new OpenAIProvider())
        this.registerProvider(new GoogleProvider())
        this.registerProvider(new OllamaProvider())
        // this.registerProvider(new HuggingFaceProvider())
    }

    public static getInstance(): ProviderFactory {
        if (!ProviderFactory.instance) {
            ProviderFactory.instance = new ProviderFactory()
        }
        return ProviderFactory.instance
    }

    private registerProvider(provider: AIProvider) {
        this.providers.set(provider.metadata.name, provider)
    }

    public getProvider(name: ProviderType): AIProvider {
        const provider = this.providers.get(name)
        if (!provider) {
            throw new ProviderUnavailableError(name, `Provider '${name}' is not initialized`)
        }
        return provider
    }

    public getAllProviders(): AIProvider[] {
        return Array.from(this.providers.values())
    }

    public async getAvailableProviders(): Promise<ProviderInfo[]> {
        const providers = this.getAllProviders()
        const results = await Promise.all(
            providers.map(async (provider) => {
                const isAvailable = provider.isAvailable()
                let health: HealthStatus = { available: false, latency: 0 }

                if (isAvailable) {
                    try {
                        health = await provider.healthCheck()
                    } catch (e) {
                        console.error(`Health check failed for ${provider.metadata.name}:`, e)
                    }
                }

                return {
                    ...provider.metadata,
                    models: provider.models,
                    capabilities: provider.capabilities,
                    available: isAvailable && health.available,
                    latency: health.latency,
                }
            })
        )
        return results
    }
}

export const providerFactory = ProviderFactory.getInstance()
