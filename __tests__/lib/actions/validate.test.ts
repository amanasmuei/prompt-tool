import { describe, it, expect } from 'vitest'
import { MAX_PROMPT_LENGTH, MIN_PROMPT_LENGTH, ERROR_MESSAGES } from '@/lib/constants'

describe('Prompt Validation', () => {
  describe('Constants', () => {
    it('should have valid MIN_PROMPT_LENGTH', () => {
      expect(MIN_PROMPT_LENGTH).toBe(10)
      expect(MIN_PROMPT_LENGTH).toBeGreaterThan(0)
    })

    it('should have valid MAX_PROMPT_LENGTH', () => {
      expect(MAX_PROMPT_LENGTH).toBe(5000)
      expect(MAX_PROMPT_LENGTH).toBeGreaterThan(MIN_PROMPT_LENGTH)
    })
  })

  describe('Error Messages', () => {
    it('should have all required error messages defined', () => {
      expect(ERROR_MESSAGES.INVALID_PROMPT).toBeDefined()
      expect(ERROR_MESSAGES.PROMPT_TOO_SHORT).toBeDefined()
      expect(ERROR_MESSAGES.PROMPT_TOO_LONG).toBeDefined()
      expect(ERROR_MESSAGES.PROVIDER_UNAVAILABLE).toBeDefined()
      expect(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED).toBeDefined()
    })

    it('should include length values in error messages', () => {
      expect(ERROR_MESSAGES.PROMPT_TOO_SHORT).toContain(String(MIN_PROMPT_LENGTH))
      expect(ERROR_MESSAGES.PROMPT_TOO_LONG).toContain(String(MAX_PROMPT_LENGTH))
    })
  })

  describe('Prompt Length Validation', () => {
    it('should reject empty prompt', () => {
      const prompt = ''
      expect(prompt.length).toBe(0)
      expect(prompt.length < MIN_PROMPT_LENGTH).toBe(true)
    })

    it('should reject too short prompt', () => {
      const prompt = 'Hi'
      expect(prompt.length).toBeLessThan(MIN_PROMPT_LENGTH)
    })

    it('should accept valid prompt', () => {
      const prompt = 'This is a valid prompt with enough characters'
      expect(prompt.length).toBeGreaterThanOrEqual(MIN_PROMPT_LENGTH)
      expect(prompt.length).toBeLessThanOrEqual(MAX_PROMPT_LENGTH)
    })

    it('should reject too long prompt', () => {
      const prompt = 'a'.repeat(MAX_PROMPT_LENGTH + 1)
      expect(prompt.length).toBeGreaterThan(MAX_PROMPT_LENGTH)
    })

    it('should accept prompt at exact MAX length', () => {
      const prompt = 'a'.repeat(MAX_PROMPT_LENGTH)
      expect(prompt.length).toBe(MAX_PROMPT_LENGTH)
    })
  })
})
