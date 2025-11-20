# Contributing to EasyPrompt

Thank you for considering contributing to EasyPrompt! This document provides guidelines and instructions for contributing.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [How to Contribute](#how-to-contribute)
5. [Adding a New Provider](#adding-a-new-provider)
6. [Code Style](#code-style)
7. [Testing](#testing)
8. [Pull Request Process](#pull-request-process)
9. [Release Process](#release-process)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

**Expected Behavior:**
- Be respectful and considerate
- Welcome newcomers
- Focus on constructive criticism
- Accept feedback gracefully

**Unacceptable Behavior:**
- Harassment or discrimination
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information

---

## Getting Started

### Prerequisites

- Node.js 20.9.0+
- npm 10.0.0+
- Git
- At least one AI provider API key OR Ollama installed

### Fork and Clone

```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR_USERNAME/easyprompt.git
cd easyprompt

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/easyprompt.git
```

---

## Development Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your API keys to .env.local
# (At least one provider required for testing)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## How to Contribute

### Types of Contributions

1. **Bug Reports** - Report issues via GitHub Issues
2. **Feature Requests** - Suggest new features
3. **Code Contributions** - Submit Pull Requests
4. **Documentation** - Improve docs
5. **Testing** - Add or improve tests
6. **Provider Additions** - Add new AI providers

### Reporting Bugs

**Before submitting:**
- Check existing issues to avoid duplicates
- Test on the latest version
- Collect relevant information

**Bug report should include:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, browser)
- Screenshots/error messages if applicable

**Template:**
```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., macOS 14.0]
- Node: [e.g., 20.9.0]
- Browser: [e.g., Chrome 120]
- Provider: [e.g., Anthropic Claude]

**Additional Context:**
Any other relevant information
```

### Suggesting Features

**Feature request should include:**
- Clear, descriptive title
- Problem statement (what problem does this solve?)
- Proposed solution
- Alternative solutions considered
- Additional context (mockups, examples, etc.)

---

## Adding a New Provider

Want to add support for a new AI provider? Great! Follow these steps:

### 1. Create Provider File

Create a new file in the appropriate directory:
- Commercial: `lib/providers/commercial/your-provider.ts`
- Open-Source: `lib/providers/open-source/your-provider.ts`

### 2. Implement AIProvider Interface

```typescript
// lib/providers/open-source/your-provider.ts
import type { AIProvider, ProviderMetadata, Model } from '../types'

export class YourProvider implements AIProvider {
  private client: any // Your SDK client

  readonly metadata: ProviderMetadata = {
    name: 'your-provider',
    displayName: 'Your Provider Name',
    category: 'open-source', // or 'commercial'
    location: 'cloud', // or 'local'
    requiresApiKey: true,
    isOpenAICompatible: false,
    supportsModelDiscovery: false,
    icon: '🔥', // Choose an emoji
    documentation: 'https://docs.yourprovider.com',
  }

  readonly defaultModel = 'your-default-model'
  readonly supportsStreaming = true

  readonly capabilities = {
    streaming: true,
    functionCalling: false,
    vision: false,
    embeddings: false,
    maxTokens: 4096,
  }

  models: Model[] = [
    {
      id: 'model-id',
      name: 'Model Name',
      tier: 'free', // or 'fast', 'standard', 'premium'
      description: 'Model description',
      contextWindow: 8192,
      provider: 'your-provider',
      openSource: true, // or false
    },
  ]

  constructor(config: { apiKey: string }) {
    // Initialize your SDK client
  }

  async healthCheck(): Promise<HealthStatus> {
    try {
      // Test connection to provider
      return {
        available: true,
        latency: 100,
      }
    } catch (error) {
      return {
        available: false,
        error: error.message,
      }
    }
  }

  isAvailable(): boolean {
    // Check if provider is properly configured
    return !!this.client
  }

  async analyzePrompt(prompt: string, model?: string): Promise<AnalysisResult> {
    // Implement prompt analysis logic
    // Call your provider's API
    // Parse and return structured result
  }

  async optimizePrompt(
    prompt: string,
    analysis: AnalysisResult,
    model?: string
  ): Promise<OptimizedPrompt> {
    // Implement prompt optimization logic
    // Use analysis to generate improved version
    // Return optimized prompt with improvements
  }

  async generatePreview(prompt: string, model?: string): Promise<string> {
    // Generate a sample response for the prompt
    // Return the response text
  }

  getModelInfo(modelId: string): Model | undefined {
    return this.models.find(m => m.id === modelId)
  }
}
```

### 3. Add to Provider Factory

```typescript
// lib/providers/factory.ts

import { YourProvider } from './open-source/your-provider'

export class ProviderFactory {
  static create(providerName: ProviderType, config?: any): AIProvider {
    // ... existing code

    switch (providerName) {
      // ... existing cases

      case 'your-provider':
        provider = new YourProvider({
          apiKey: process.env.YOUR_PROVIDER_API_KEY!,
        })
        break

      // ... rest of switch
    }
  }
}
```

### 4. Add Environment Variable

```typescript
// .env.example

# Your Provider
# Get your API key: https://yourprovider.com/api-keys
YOUR_PROVIDER_API_KEY=

# Feature flag
ENABLE_YOUR_PROVIDER=false
```

### 5. Update Types

```typescript
// lib/providers/types.ts

export type ProviderType =
  | 'anthropic'
  | 'openai'
  // ...
  | 'your-provider' // Add your provider
```

### 6. Add Dependencies

```bash
# Install provider SDK
npm install your-provider-sdk

# Update package.json
```

### 7. Documentation

Update documentation:
- Add to `ARCHITECTURE.md` provider list
- Add to `README.md` supported providers
- Add setup instructions
- Add troubleshooting section

### 8. Testing

Test your provider:
- Health check works
- Prompt analysis works
- Prompt optimization works
- Preview generation works
- Error handling works
- All models accessible

### 9. Submit Pull Request

Create a PR with:
- Provider implementation
- Updated documentation
- Environment variable example
- Testing results

---

## Code Style

### TypeScript

- Use TypeScript strict mode
- Define proper types (avoid `any`)
- Use interfaces for public APIs
- Document complex functions

### Naming Conventions

```typescript
// Interfaces: PascalCase
interface ProviderConfig { }

// Types: PascalCase
type ProviderType = 'anthropic' | 'openai'

// Classes: PascalCase
class AnthropicProvider { }

// Functions: camelCase
async function analyzePrompt() { }

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3

// Files: kebab-case
// provider-factory.ts
```

### Code Formatting

```bash
# Run Prettier
npm run format

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

### Component Structure

**Server Components:**
```typescript
// components/server/Example.tsx
import { analyzePrompt } from '@/lib/actions/analyze'

export async function Example({ prompt }: { prompt: string }) {
  const result = await analyzePrompt(prompt)
  return <div>{result}</div>
}
```

**Client Components:**
```typescript
// components/client/Example.tsx
'use client'

import { useState } from 'react'

export function Example() {
  const [state, setState] = useState('')
  return <button onClick={() => setState('clicked')}>Click</button>
}
```

### Comments

```typescript
// Good: Explain WHY, not WHAT
// Retry logic needed due to provider rate limits
const retryWithBackoff = async () => { }

// Bad: Obvious comment
// This function adds two numbers
const add = (a: number, b: number) => a + b

// Good: Document complex algorithms
/**
 * Implements exponential backoff with jitter
 * @param attempt - Current retry attempt (0-indexed)
 * @returns Delay in milliseconds
 */
function calculateBackoff(attempt: number): number { }
```

---

## Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] All providers work correctly
- [ ] Health checks return correct status
- [ ] Rate limiting works
- [ ] Error handling works
- [ ] UI is responsive on mobile
- [ ] No console errors
- [ ] TypeScript compiles
- [ ] ESLint passes
- [ ] Production build succeeds

### Testing New Providers

- [ ] Health check returns correct status
- [ ] Can analyze prompts
- [ ] Can optimize prompts
- [ ] Can generate previews
- [ ] Error messages are clear
- [ ] Rate limits respected
- [ ] All models work

---

## Pull Request Process

### Before Submitting

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes**
   - Follow code style guidelines
   - Add comments where needed
   - Update documentation

4. **Test thoroughly**
   - Run type-check
   - Run linting
   - Test functionality manually

5. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

   **Commit message format:**
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `style:` formatting changes
   - `refactor:` code refactoring
   - `test:` adding tests
   - `chore:` maintenance tasks

### Submitting PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**

3. **Fill out PR template**
   - Clear title
   - Description of changes
   - Related issues (if any)
   - Testing performed
   - Screenshots (if UI changes)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Related Issues
Fixes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Performed
- [ ] Type checking passed
- [ ] Linting passed
- [ ] Manual testing completed
- [ ] All providers tested

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on mobile
- [ ] Ready for review
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Make requested changes
4. Push updates to your branch
5. PR will be merged when approved

---

## Release Process

(For maintainers)

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Tag release
5. Deploy to production
6. Announce release

---

## Questions?

- **GitHub Discussions:** Ask questions
- **GitHub Issues:** Report bugs
- **Discord:** Join our community (if available)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to EasyPrompt!** 🎉
