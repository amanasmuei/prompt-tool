import {
    AnalysisResult,
    HealthStatus,
    Model,
    OptimizedPrompt,
    ProviderCapabilities,
    ProviderMetadata,
} from './types'

export interface AIProvider {
    readonly metadata: ProviderMetadata
    readonly models: Model[]
    readonly defaultModel: string
    readonly capabilities: ProviderCapabilities

    /**
     * Analyze a prompt to identify issues and improvements
     */
    analyzePrompt(prompt: string, model?: string): Promise<AnalysisResult>

    /**
     * Optimize a prompt based on analysis
     */
    optimizePrompt(
        prompt: string,
        analysis: AnalysisResult,
        model?: string
    ): Promise<OptimizedPrompt>

    /**
     * Generate a preview/response using the prompt
     */
    generatePreview(prompt: string, model?: string): Promise<string>

    /**
     * Check if the provider is healthy and reachable
     */
    healthCheck(): Promise<HealthStatus>

    /**
     * Check if the provider is configured and enabled
     */
    isAvailable(): boolean

    /**
     * Get details for a specific model
     */
    getModelInfo(modelId: string): Model | undefined
}

export abstract class BaseProvider implements AIProvider {
    abstract readonly metadata: ProviderMetadata
    abstract readonly models: Model[]
    abstract readonly defaultModel: string
    abstract readonly capabilities: ProviderCapabilities

    abstract analyzePrompt(prompt: string, model?: string): Promise<AnalysisResult>
    abstract optimizePrompt(
        prompt: string,
        analysis: AnalysisResult,
        model?: string
    ): Promise<OptimizedPrompt>
    abstract generatePreview(prompt: string, model?: string): Promise<string>
    abstract healthCheck(): Promise<HealthStatus>

    isAvailable(): boolean {
        // Default implementation checks if API key exists (if required)
        if (this.metadata.requiresApiKey) {
            const keyName = `${this.metadata.name.toUpperCase()}_API_KEY`
            return !!process.env[keyName]
        }
        return true
    }

    getModelInfo(modelId: string): Model | undefined {
        return this.models.find((m) => m.id === modelId)
    }

    protected getModel(modelId?: string): string {
        return modelId || this.defaultModel
    }
}
