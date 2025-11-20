'use server'

import { providerFactory } from '../providers/factory'
import { ProviderType, OptimizationResult } from '../providers/types'
import { optimizePrompt } from './optimize'

export interface ComparisonResult {
    provider: ProviderType
    model: string
    output?: string
    error?: string
    latency: number
}

export async function compareProviders(
    prompt: string,
    providers: { name: ProviderType; model?: string }[]
): Promise<ComparisonResult[]> {
    if (!prompt) {
        throw new Error('Prompt is required')
    }

    const results = await Promise.allSettled(
        providers.map(async ({ name, model }) => {
            const start = Date.now()
            try {
                const provider = providerFactory.getProvider(name)
                const output = await provider.generatePreview(prompt, model)
                const latency = Date.now() - start

                return {
                    provider: name,
                    model: model || provider.defaultModel,
                    output,
                    latency,
                }
            } catch (error) {
                const latency = Date.now() - start
                return {
                    provider: name,
                    model: model || 'unknown',
                    error: error instanceof Error ? error.message : 'Unknown error',
                    latency,
                }
            }
        })
    )

    return results.map((result, index) => {
        if (result.status === 'fulfilled') {
            return result.value
        } else {
            const providerConfig = providers[index]
            return {
                provider: (providerConfig?.name || 'ollama') as ProviderType,
                model: providerConfig?.model || 'unknown',
                error: 'Failed to execute comparison',
                latency: 0,
            }
        }
    })
}

// New function for comparing prompt optimizations
export async function comparePrompts(
    prompt: string,
    providerNames: ProviderType[]
): Promise<Map<ProviderType, OptimizationResult | Error>> {
    const results = new Map<ProviderType, OptimizationResult | Error>()

    await Promise.allSettled(
        providerNames.map(async (providerName) => {
            try {
                const result = await optimizePrompt(prompt, undefined, providerName)
                results.set(providerName, result)
            } catch (error) {
                results.set(providerName, error instanceof Error ? error : new Error('Unknown error'))
            }
        })
    )

    return results
}
