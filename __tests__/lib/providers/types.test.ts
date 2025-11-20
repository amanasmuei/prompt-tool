import { describe, it, expect } from 'vitest'
import type { ProviderType, ProviderCapabilities, HealthStatus } from '@/types'

describe('Provider Types', () => {
  describe('ProviderType', () => {
    it('should have valid provider types', () => {
      const validProviders: ProviderType[] = [
        'anthropic',
        'openai',
        'google',
        'ollama',
        'huggingface',
        'together',
        'replicate',
        'cohere',
      ]

      validProviders.forEach((provider) => {
        expect(provider).toBeTruthy()
        expect(typeof provider).toBe('string')
      })
    })
  })

  describe('ProviderCapabilities', () => {
    it('should create valid capabilities object', () => {
      const capabilities: ProviderCapabilities = {
        streaming: true,
        supportsStreaming: true,
        functionCalling: false,
        vision: false,
        embeddings: false,
        maxTokens: 4096,
      }

      expect(capabilities.streaming).toBe(true)
      expect(capabilities.maxTokens).toBeGreaterThan(0)
      expect(typeof capabilities.functionCalling).toBe('boolean')
    })
  })

  describe('HealthStatus', () => {
    it('should create healthy status', () => {
      const status: HealthStatus = {
        available: true,
        latency: 250,
        modelsCount: 3,
      }

      expect(status.available).toBe(true)
      expect(status.latency).toBeGreaterThanOrEqual(0)
      expect(status.error).toBeUndefined()
    })

    it('should create unhealthy status', () => {
      const status: HealthStatus = {
        available: false,
        error: 'Connection timeout',
      }

      expect(status.available).toBe(false)
      expect(status.error).toBeDefined()
      expect(typeof status.error).toBe('string')
    })
  })
})
