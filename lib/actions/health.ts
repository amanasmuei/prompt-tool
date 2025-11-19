'use server'

import { providerFactory } from '../providers/factory'
import { ProviderType, HealthStatus } from '../providers/types'

export async function checkProviderHealth(
    providerName: ProviderType
): Promise<HealthStatus> {
    try {
        const provider = providerFactory.getProvider(providerName)
        return await provider.healthCheck()
    } catch (error) {
        return {
            available: false,
            error: error instanceof Error ? error.message : 'Health check failed',
        }
    }
}
