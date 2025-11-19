'use server'

import { providerFactory } from '../providers/factory'
import { ProviderType } from '../providers/types'

export async function generatePreview(
    prompt: string,
    providerName: ProviderType,
    model?: string
): Promise<string> {
    if (!prompt) {
        throw new Error('Prompt is required')
    }

    try {
        const provider = providerFactory.getProvider(providerName)
        return await provider.generatePreview(prompt, model)
    } catch (error) {
        console.error(`[Action] Preview generation failed for ${providerName}:`, error)
        throw new Error(error instanceof Error ? error.message : 'Failed to generate preview')
    }
}
