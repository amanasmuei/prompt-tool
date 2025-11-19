'use server'

import { providerFactory } from '../providers/factory'
import { ProviderType, AnalysisResult } from '../providers/types'

export async function analyzePrompt(
    prompt: string,
    providerName: ProviderType,
    model?: string
): Promise<AnalysisResult> {
    if (!prompt) {
        throw new Error('Prompt is required')
    }

    try {
        const provider = providerFactory.getProvider(providerName)
        return await provider.analyzePrompt(prompt, model)
    } catch (error) {
        console.error(`[Action] Analysis failed for ${providerName}:`, error)
        // Re-throw with a user-friendly message if possible, or let the UI handle it
        throw new Error(error instanceof Error ? error.message : 'Failed to analyze prompt')
    }
}
