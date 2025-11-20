'use client'

import { PromptInput } from '@/components/features/PromptInput'
import { ProviderSelector } from '@/components/features/ProviderSelector'
import { AnalysisDisplay } from '@/components/features/AnalysisDisplay'
import { OptimizationDisplay } from '@/components/features/OptimizationDisplay'
import { usePrompt } from '@/components/hooks/use-prompt'
import { useProvider } from '@/components/hooks/use-provider'
import { Card } from '@/components/ui/card'
import { Sparkles, Zap, Shield, Globe, Stars, Rocket, TrendingUp } from 'lucide-react'

export default function Home() {
  const {
    prompt,
    setPrompt,
    isAnalyzing,
    analysis,
    optimizationResult,
    error,
    handleAnalyze,
  } = usePrompt()

  const {
    providers,
    selectedProvider,
    selectedModel,
    setSelectedModel,
    handleProviderChange,
    isLoading: providersLoading,
  } = useProvider()

  const handleOptimize = () => {
    handleAnalyze(selectedProvider, selectedModel)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-animated">
      {/* Hero Section */}
      <section className="glass border-b border-white/10">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-6 animate-bounce-in">
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Stars className="h-4 w-4 text-yellow-300 animate-pulse" />
                <span className="text-sm font-semibold text-white">AI-Powered Optimization</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-white drop-shadow-lg">Transform Your</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                AI Prompts
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
              From amateur to professional with <strong className="text-yellow-200">instant optimization</strong> across multiple AI providers
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <FeaturePill icon={Sparkles} color="blue">
                AI Analysis
              </FeaturePill>
              <FeaturePill icon={Zap} color="yellow">
                Real-time
              </FeaturePill>
              <FeaturePill icon={Globe} color="purple">
                Multi-Provider
              </FeaturePill>
              <FeaturePill icon={Shield} color="green">
                100% Private
              </FeaturePill>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editor Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Provider Selection */}
          <Card className="glass-card border-white/20 p-6 animate-in hover:scale-[1.01] transition-all duration-300">
            <ProviderSelector
              providers={providers}
              selectedProvider={selectedProvider}
              selectedModel={selectedModel}
              onProviderChange={handleProviderChange}
              onModelChange={setSelectedModel}
              isLoading={providersLoading}
            />
          </Card>

          {/* Prompt Input */}
          <div className="space-y-4 animate-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Enter Your Prompt
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full glass text-sm text-white/80">
                <TrendingUp className="h-4 w-4" />
                <span className="font-semibold">{prompt.length} characters</span>
              </div>
            </div>
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleOptimize}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Error Display */}
          {error && (
            <Card className="glass-card border-red-400/30 bg-red-500/10 p-6 animate-bounce-in">
              <div className="text-red-100">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Error
                </h3>
                <p className="text-red-200">{error}</p>
              </div>
            </Card>
          )}

          {/* Results Grid */}
          {(analysis || optimizationResult) && (
            <div className="grid md:grid-cols-2 gap-6 animate-in" style={{ animationDelay: '0.2s' }}>
              {/* Analysis Results */}
              {analysis && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                    Analysis
                  </h2>
                  <AnalysisDisplay analysis={analysis} />
                </div>
              )}

              {/* Optimized Prompt */}
              {optimizationResult && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-green-300" />
                    Optimized Prompt
                  </h2>
                  <OptimizationDisplay optimization={optimizationResult} />
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!isAnalyzing && !analysis && !optimizationResult && !error && (
            <Card className="glass-card border-white/20 p-16 text-center animate-in" style={{ animationDelay: '0.3s' }}>
              <div className="max-w-md mx-auto space-y-4">
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
                  <Sparkles className="h-16 w-16 text-yellow-300 glow" />
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  Ready to Optimize
                </h3>
                <p className="text-white/80 text-lg">
                  Enter your prompt above and click <strong className="text-yellow-200">&quot;Optimize&quot;</strong> to get started
                </p>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 text-white drop-shadow-lg">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              number="1"
              title="Enter Your Prompt"
              description="Type or paste your prompt. Select your preferred AI provider and model."
              color="blue"
            />
            <FeatureCard
              number="2"
              title="AI Analysis"
              description="Our AI analyzes your prompt for clarity, specificity, and effectiveness."
              color="purple"
            />
            <FeatureCard
              number="3"
              title="Get Optimized Results"
              description="Receive an improved prompt with detailed explanations of all changes."
              color="pink"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function FeaturePill({
  icon: Icon,
  children,
  color
}: {
  icon: React.ElementType
  children: React.ReactNode
  color: 'blue' | 'yellow' | 'purple' | 'green'
}) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-100 border-blue-400/30',
    yellow: 'bg-yellow-500/20 text-yellow-100 border-yellow-400/30',
    purple: 'bg-purple-500/20 text-purple-100 border-purple-400/30',
    green: 'bg-green-500/20 text-green-100 border-green-400/30',
  }

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full glass border ${colorClasses[color]} hover:scale-105 transition-transform duration-300 cursor-default`}>
      <Icon className="h-4 w-4" />
      <span className="font-semibold text-sm">{children}</span>
    </div>
  )
}

function FeatureCard({
  number,
  title,
  description,
  color
}: {
  number: string
  title: string
  description: string
  color: 'blue' | 'purple' | 'pink'
}) {
  const gradients = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    pink: 'from-pink-500 to-rose-500',
  }

  return (
    <Card className="glass-card border-white/20 p-8 card-interactive group">
      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${gradients[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-3xl font-black text-white drop-shadow-lg">{number}</span>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">
        {title}
      </h3>
      <p className="text-white/80 text-lg leading-relaxed">
        {description}
      </p>
    </Card>
  )
}
