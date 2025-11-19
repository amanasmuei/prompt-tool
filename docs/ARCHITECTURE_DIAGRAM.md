# EasyPrompt - Architecture Diagram

This document contains interactive architecture diagrams for the EasyPrompt platform.

---

## System Architecture (Mermaid - Interactive)

```mermaid
graph TB
    subgraph UI["🎨 User Interface Layer (React 19)"]
        HomePage[Home Page]
        ComparePage[Compare Page]
        ProvidersPage[Providers Page]
        TemplatesPage[Templates Page]
        GuidePage[Guide Page]
    end

    subgraph Actions["⚡ Server Actions Layer"]
        AnalyzeAction[analyze.ts]
        OptimizeAction[optimize.ts]
        PreviewAction[preview.ts]
        CompareAction[compare.ts]
        HealthAction[health.ts]
        DiscoverAction[discover-models.ts]
        ProvidersAction[providers.ts]
    end

    subgraph Factory["🏭 Provider Factory"]
        ProviderFactory[Provider Factory<br/>Singleton Pattern]
    end

    subgraph Commercial["💳 Commercial Providers"]
        Anthropic["🤖 Anthropic Claude<br/>Sonnet, Opus, Haiku"]
        OpenAI["🔮 OpenAI GPT<br/>GPT-4, GPT-3.5"]
        Google["🔍 Google Gemini<br/>1.5 Pro/Flash"]
    end

    subgraph OpenSource["🔓 Open-Source Providers"]
        Ollama["🦙 Ollama (Local)<br/>Llama, Mistral, Qwen"]
        HuggingFace["🤗 Hugging Face<br/>1000+ models"]
        Together["⚡ Together AI<br/>200+ models"]
        Replicate["🔁 Replicate<br/>100+ models"]
    end

    subgraph AIModels["🧠 AI Models"]
        LocalModels[Local Models<br/>Ollama]
        CloudModels[Cloud Models<br/>APIs]
    end

    %% Connections
    UI --> Actions
    Actions --> ProviderFactory
    ProviderFactory --> Commercial
    ProviderFactory --> OpenSource
    Commercial --> CloudModels
    OpenSource --> LocalModels
    OpenSource --> CloudModels

    %% Styling
    classDef uiStyle fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff
    classDef actionStyle fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
    classDef factoryStyle fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    classDef commercialStyle fill:#eab308,stroke:#ca8a04,stroke-width:2px,color:#000
    classDef openSourceStyle fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    classDef modelStyle fill:#6b7280,stroke:#4b5563,stroke-width:2px,color:#fff

    class HomePage,ComparePage,ProvidersPage,TemplatesPage,GuidePage uiStyle
    class AnalyzeAction,OptimizeAction,PreviewAction,CompareAction,HealthAction,DiscoverAction,ProvidersAction actionStyle
    class ProviderFactory factoryStyle
    class Anthropic,OpenAI,Google commercialStyle
    class Ollama,HuggingFace,Together,Replicate openSourceStyle
    class LocalModels,CloudModels modelStyle
```

---

## Data Flow Diagram (Mermaid - Interactive)

```mermaid
sequenceDiagram
    participant User
    participant UI as UI Component
    participant Action as Server Action
    participant Factory as Provider Factory
    participant Provider as AI Provider
    participant API as AI API

    User->>UI: Enter prompt
    UI->>Action: optimizePrompt(prompt, provider)
    Action->>Factory: create(provider)
    Factory->>Provider: new Provider()
    Provider-->>Factory: provider instance
    Factory-->>Action: provider instance
    
    Action->>Provider: analyzePrompt(prompt)
    Provider->>API: analyze request
    API-->>Provider: analysis response
    Provider-->>Action: AnalysisResult
    
    Action->>Provider: optimizePrompt(prompt, analysis)
    Provider->>API: optimize request
    API-->>Provider: optimized response
    Provider-->>Action: OptimizedPrompt
    
    Action-->>UI: OptimizationResult
    UI-->>User: Display results
```

---

## Provider Class Hierarchy (Mermaid - Interactive)

```mermaid
classDiagram
    class AIProvider {
        <<interface>>
        +metadata: ProviderMetadata
        +models: Model[]
        +defaultModel: string
        +capabilities: ProviderCapabilities
        +analyzePrompt(prompt, model): Promise~AnalysisResult~
        +optimizePrompt(prompt, analysis, model): Promise~OptimizedPrompt~
        +generatePreview(prompt, model): Promise~string~
        +healthCheck(): Promise~HealthStatus~
        +isAvailable(): boolean
        +getModelInfo(modelId): Model
    }

    class AnthropicProvider {
        -client: Anthropic
        +metadata: ProviderMetadata
        +models: Model[]
        +analyzePrompt()
        +optimizePrompt()
        +healthCheck()
    }

    class OpenAIProvider {
        -client: OpenAI
        +metadata: ProviderMetadata
        +models: Model[]
        +analyzePrompt()
        +optimizePrompt()
        +healthCheck()
    }

    class GoogleProvider {
        -client: GenerativeAI
        +metadata: ProviderMetadata
        +models: Model[]
        +analyzePrompt()
        +optimizePrompt()
        +healthCheck()
    }

    class OllamaProvider {
        -client: Ollama
        +metadata: ProviderMetadata
        +models: Model[]
        +discoverModels()
        +analyzePrompt()
        +optimizePrompt()
        +healthCheck()
    }

    class HuggingFaceProvider {
        -client: HfInference
        +metadata: ProviderMetadata
        +models: Model[]
        +analyzePrompt()
        +optimizePrompt()
        +healthCheck()
    }

    class ProviderFactory {
        -instances: Map
        +create(providerName): AIProvider
        +getAvailableProviders(): Promise~ProviderInfo[]~
    }

    AIProvider <|.. AnthropicProvider
    AIProvider <|.. OpenAIProvider
    AIProvider <|.. GoogleProvider
    AIProvider <|.. OllamaProvider
    AIProvider <|.. HuggingFaceProvider
    ProviderFactory ..> AIProvider: creates
```

---

## Component Structure (Mermaid - Interactive)

```mermaid
graph LR
    subgraph ClientComponents["Client Components ('use client')"]
        PromptInput[PromptInput.tsx]
        ProviderSelector[ProviderSelector.tsx]
        ModelSelector[ModelSelector.tsx]
        OptimizeButton[OptimizeButton.tsx]
        CopyButton[CopyButton.tsx]
        HealthCheck[ProviderHealthCheck.tsx]
        Setup[LocalProviderSetup.tsx]
        Theme[ThemeToggle.tsx]
    end

    subgraph ServerComponents["Server Components (async)"]
        OptimizedDisplay[OptimizedPromptDisplay.tsx]
        AnalysisResults[AnalysisResults.tsx]
        ComparisonGrid[ComparisonGrid.tsx]
        ProviderBadge[ProviderBadge.tsx]
        HealthStatus[ProviderHealthStatus.tsx]
        ModelList[ModelList.tsx]
        ImprovementsList[ImprovementsList.tsx]
    end

    subgraph Pages["Pages (App Router)"]
        Home[app/page.tsx]
        Compare[app/compare/page.tsx]
        Providers[app/providers/page.tsx]
        Templates[app/templates/page.tsx]
        Guide[app/guide/page.tsx]
    end

    Pages --> ClientComponents
    Pages --> ServerComponents
    ClientComponents --> ServerComponents

    classDef clientStyle fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff
    classDef serverStyle fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
    classDef pageStyle fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff

    class PromptInput,ProviderSelector,ModelSelector,OptimizeButton,CopyButton,HealthCheck,Setup,Theme clientStyle
    class OptimizedDisplay,AnalysisResults,ComparisonGrid,ProviderBadge,HealthStatus,ModelList,ImprovementsList serverStyle
    class Home,Compare,Providers,Templates,Guide pageStyle
```

---

## Deployment Architecture (Mermaid - Interactive)

```mermaid
graph TB
    subgraph Vercel["☁️ Vercel Platform"]
        NextApp[Next.js 16 Application]
        EdgeFunctions[Edge Functions<br/>Rate Limiting]
    end

    subgraph Upstash["🗄️ Upstash"]
        Redis[Redis<br/>Rate Limit Storage]
    end

    subgraph CommercialAPIs["💳 Commercial APIs"]
        AnthropicAPI[Anthropic API]
        OpenAIAPI[OpenAI API]
        GoogleAPI[Google AI API]
    end

    subgraph OpenAPIs["🔓 Open-Source APIs"]
        HuggingFaceAPI[Hugging Face API]
        TogetherAPI[Together AI API]
        ReplicateAPI[Replicate API]
    end

    subgraph Local["💻 User's Machine"]
        OllamaLocal[Ollama<br/>Local Models]
    end

    User[👤 User] --> Vercel
    EdgeFunctions --> Redis
    NextApp --> CommercialAPIs
    NextApp --> OpenAPIs
    User --> OllamaLocal
    OllamaLocal --> NextApp

    classDef vercelStyle fill:#000,stroke:#fff,stroke-width:2px,color:#fff
    classDef redisStyle fill:#dc2626,stroke:#991b1b,stroke-width:2px,color:#fff
    classDef commercialStyle fill:#eab308,stroke:#ca8a04,stroke-width:2px,color:#000
    classDef openStyle fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    classDef localStyle fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff

    class NextApp,EdgeFunctions vercelStyle
    class Redis redisStyle
    class AnthropicAPI,OpenAIAPI,GoogleAPI commercialStyle
    class HuggingFaceAPI,TogetherAPI,ReplicateAPI openStyle
    class OllamaLocal localStyle
```

---

## State Management Flow (Mermaid - Interactive)

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> SelectingProvider: User selects provider
    SelectingProvider --> SelectingModel: Provider selected
    SelectingModel --> EnteringPrompt: Model selected
    EnteringPrompt --> Analyzing: Click "Optimize"

    Analyzing --> AnalysisComplete: Analysis done
    AnalysisComplete --> Optimizing: Start optimization

    Optimizing --> OptimizationComplete: Optimization done
    OptimizationComplete --> DisplayingResults: Show results

    DisplayingResults --> Idle: Reset
    DisplayingResults --> Comparing: Click "Compare"
    
    Comparing --> ComparingProviders: Fetch all providers
    ComparingProviders --> ComparisonComplete: All done
    ComparisonComplete --> DisplayingComparison: Show comparison
    DisplayingComparison --> Idle: Reset

    Analyzing --> Error: API Error
    Optimizing --> Error: API Error
    Comparing --> Error: API Error
    Error --> Idle: Retry
```

---

## File Structure Tree (Text)

```
easyprompt/
├── 📄 Configuration Files
│   ├── next.config.ts          # Next.js 16 config
│   ├── tailwind.config.ts      # Tailwind CSS 4
│   ├── tsconfig.json            # TypeScript
│   ├── proxy.ts                 # Rate limiting
│   └── .env.local               # Environment variables
│
├── 📁 app/                      # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (optimizer)
│   ├── globals.css              # Global styles
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Loading UI
│   ├── compare/
│   │   └── page.tsx             # Multi-provider comparison
│   ├── providers/
│   │   └── page.tsx             # Provider management
│   ├── templates/
│   │   └── page.tsx             # Prompt templates
│   └── guide/
│       └── page.tsx             # Best practices guide
│
├── 📁 components/
│   ├── 🖥️ client/               # Client Components
│   │   ├── PromptInput.tsx
│   │   ├── ProviderSelector.tsx
│   │   ├── ModelSelector.tsx
│   │   ├── OptimizeButton.tsx
│   │   ├── CopyButton.tsx
│   │   ├── ProviderHealthCheck.tsx
│   │   ├── LocalProviderSetup.tsx
│   │   └── ThemeToggle.tsx
│   │
│   └── ⚙️ server/                # Server Components
│       ├── OptimizedPromptDisplay.tsx
│       ├── AnalysisResults.tsx
│       ├── ComparisonGrid.tsx
│       ├── ProviderBadge.tsx
│       ├── ProviderHealthStatus.tsx
│       ├── ModelList.tsx
│       └── ImprovementsList.tsx
│
├── 📁 lib/
│   ├── ⚡ actions/               # Server Actions
│   │   ├── analyze.ts
│   │   ├── optimize.ts
│   │   ├── preview.ts
│   │   ├── compare.ts
│   │   ├── health.ts
│   │   ├── discover-models.ts
│   │   └── providers.ts
│   │
│   ├── 🤖 providers/            # AI Provider Adapters
│   │   ├── base.ts              # AIProvider interface
│   │   ├── factory.ts           # ProviderFactory
│   │   ├── types.ts             # Shared types
│   │   ├── errors.ts            # Custom errors
│   │   │
│   │   ├── 💳 commercial/
│   │   │   ├── anthropic.ts     # Claude
│   │   │   ├── openai.ts        # GPT
│   │   │   └── google.ts        # Gemini
│   │   │
│   │   └── 🔓 open-source/
│   │       ├── ollama.ts        # Local
│   │       ├── huggingface.ts   # Cloud
│   │       ├── together.ts      # Cloud
│   │       └── replicate.ts     # Cloud
│   │
│   ├── 💬 prompts/              # System Prompts
│   │   ├── analysis.ts
│   │   ├── optimization.ts
│   │   └── templates.ts
│   │
│   ├── constants.ts             # App constants
│   └── utils.ts                 # Utilities
│
├── 📁 types/
│   └── index.ts                 # TypeScript types
│
└── 📁 docs/                     # Documentation
    ├── README.md
    ├── ARCHITECTURE.md
    ├── CONTRIBUTING.md
    ├── PROJECT_COMPLETION_PLAN.md
    ├── PROJECT_STATUS.md
    ├── NEXT_STEPS.md
    ├── ANALYSIS_SUMMARY.md
    └── ARCHITECTURE_DIAGRAM.md  # This file
```

---

## Technology Stack Visualization (Mermaid - Interactive)

```mermaid
graph LR
    subgraph Frontend["🎨 Frontend"]
        NextJS[Next.js 16]
        React[React 19.2]
        TypeScript[TypeScript 5.7]
        Tailwind[Tailwind CSS 4]
        RadixUI[Radix UI]
        Lucide[Lucide Icons]
    end

    subgraph Backend["⚙️ Backend"]
        ServerActions[Server Actions]
        ProviderSDKs[Provider SDKs]
        Ollama[Ollama SDK]
    end

    subgraph Infrastructure["🏗️ Infrastructure"]
        Vercel[Vercel]
        Upstash[Upstash Redis]
        RateLimit[Rate Limiting]
    end

    subgraph AISDK["🤖 AI SDKs"]
        Anthropic[Anthropic SDK]
        OpenAI[OpenAI SDK]
        Google[Google AI SDK]
        HuggingFace[HuggingFace SDK]
        Replicate[Replicate SDK]
    end

    Frontend --> Backend
    Backend --> Infrastructure
    Backend --> AISDK

    classDef frontendStyle fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff
    classDef backendStyle fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
    classDef infraStyle fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    classDef aiStyle fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff

    class NextJS,React,TypeScript,Tailwind,RadixUI,Lucide frontendStyle
    class ServerActions,ProviderSDKs,Ollama backendStyle
    class Vercel,Upstash,RateLimit infraStyle
    class Anthropic,OpenAI,Google,HuggingFace,Replicate aiStyle
```

---

## Static Diagram

![Architecture Diagram](./architecture-diagram.png)

---

**Note:** The Mermaid diagrams above will render interactively on GitHub, allowing you to zoom, pan, and view tooltips. The static PNG diagram is also provided as a fallback.

**Last Updated:** 2025-11-19  
**Version:** 1.0.0
