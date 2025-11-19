'use server'

import { providerFactory } from '../providers/factory'
import { ProviderInfo } from '../providers/types'

export async function getProviders(): Promise<ProviderInfo[]> {
    try {
        return await providerFactory.getAvailableProviders()
    } catch (error) {
        console.error('[Action] Failed to get providers:', error)
        return []
    }
}
