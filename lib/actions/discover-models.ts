'use server'

import { providerFactory } from '../providers/factory'
import { Model, ProviderType } from '../providers/types'

export async function discoverModels(providerName: ProviderType): Promise<Model[]> {
    try {
        const provider = providerFactory.getProvider(providerName)

        if (provider.metadata.supportsModelDiscovery) {
            // Trigger discovery via health check (implementation detail of OllamaProvider)
            await provider.healthCheck()
        }

        return provider.models
    } catch (error) {
        console.error(`[Action] Model discovery failed for ${providerName}:`, error)
        return []
    }
}
