'use server'

import { providerFactory } from '../providers/factory'
import { Model, ProviderType } from '../providers/types'

export async function discoverModels(providerName?: ProviderType): Promise<Model[]> {
    const targetProvider = providerName || 'ollama'

    try {
        const provider = providerFactory.getProvider(targetProvider)

        if (provider.metadata.supportsModelDiscovery) {
            // Trigger discovery via health check (implementation detail of OllamaProvider)
            await provider.healthCheck()
        }

        return provider.models
    } catch (error) {
        console.error(`[Action] Model discovery failed for ${targetProvider}:`, error)
        return []
    }
}
