'use server'

import { providerFactory } from '../providers/factory'
import { ProviderType, AnalysisResult, OptimizationResult } from '../providers/types'

export async function optimizePrompt(
    prompt: string,
    analysis: AnalysisResult,
    providerName: ProviderType,
    model?: string
): Promise<OptimizationResult> {
    if (!prompt) {
        throw new Error('Prompt is required')
    }

    try {
        const provider = providerFactory.getProvider(providerName)
        const result = await provider.optimizePrompt(prompt, analysis, model)

        return {
            original: prompt,
            optimized: result.text,
            improvements: result.improvements,
            analysis,
            provider: providerName,
            model: model || provider.defaultModel,
            timestamp: new Date().toISOString(),
        }
    } catch (error) {
        console.error(`[Action] Optimization failed for ${providerName}:`, error)
        throw new Error(error instanceof Error ? error.message : 'Failed to optimize prompt')
    }
}
