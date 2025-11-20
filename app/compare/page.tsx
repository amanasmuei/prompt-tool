'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useProvider } from '@/components/hooks/use-provider'
import { comparePrompts } from '@/lib/actions/compare'
import { OptimizationResult, ProviderType } from '@/lib/providers/types'
import { GitCompare, ArrowRight, Sparkles, Zap, Clock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

export default function ComparePage() {
    const { providers } = useProvider()
    const [prompt, setPrompt] = useState('')
    const [isComparing, setIsComparing] = useState(false)
    const [results, setResults] = useState<Map<ProviderType, OptimizationResult | Error>>(new Map())

    const handleCompare = async () => {
        if (!prompt.trim()) return

        setIsComparing(true)
        setResults(new Map())

        try {
            // Select up to 3 available providers for comparison
            const availableProviders = providers
                .filter(p => p.available)
                .slice(0, 3)
                .map(p => p.name)

            const comparisonResults = await comparePrompts(prompt, availableProviders)
            setResults(comparisonResults)
        } catch (error) {
            console.error('Comparison failed:', error)
        } finally {
            setIsComparing(false)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-animated">
            {/* Header */}
            <section className="glass border-b border-white/10">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto space-y-6 animate-bounce-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <GitCompare className="h-5 w-5 text-blue-300" />
                            <span className="text-sm font-semibold text-white">Multi-Model Comparison</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                            Compare & <span className="gradient-text">Conquer</span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                            See how different AI models optimize your prompt side-by-side. Find the perfect match for your specific use case.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Input Section */}
                    <Card className="glass-card border-white/20 p-8 animate-in">
                        <div className="space-y-4">
                            <label className="text-lg font-bold text-white flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-yellow-300" />
                                Your Original Prompt
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter a prompt to compare across different AI models..."
                                    className="min-h-[150px] bg-white/5 border-2 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 text-lg rounded-xl resize-none p-6 transition-all duration-300"
                                />
                            </div>
                            <div className="flex justify-end pt-2">
                                <Button
                                    onClick={handleCompare}
                                    disabled={!prompt.trim() || isComparing}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isComparing ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Running Comparison...
                                        </>
                                    ) : (
                                        <>
                                            Compare Models
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Results Grid */}
                    {results.size > 0 && (
                        <div className="grid md:grid-cols-3 gap-6 animate-in" style={{ animationDelay: '0.2s' }}>
                            {Array.from(results.entries()).map(([providerName, result], index) => (
                                <div
                                    key={providerName}
                                    className="animate-slide-up"
                                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                                >
                                    <Card className="h-full glass-card border-white/20 hover:border-white/40 transition-all duration-300 group flex flex-col">
                                        {/* Provider Header */}
                                        <div className="p-6 border-b border-white/10 bg-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge className="bg-white/10 text-white border-white/20 px-3 py-1 text-sm font-bold capitalize">
                                                    {providerName}
                                                </Badge>
                                                {!(result instanceof Error) && (
                                                    <div className="flex items-center gap-1 text-xs font-mono text-green-300 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(result.timestamp).toLocaleTimeString()}
                                                    </div>
                                                )}
                                            </div>

                                            {!(result instanceof Error) && (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                                            style={{ width: `${result.analysis.score}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-bold text-white">{result.analysis.score}/100</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col gap-6">
                                            {result instanceof Error ? (
                                                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                                    <div className="p-3 rounded-full bg-red-500/20 mb-3">
                                                        <AlertCircle className="h-8 w-8 text-red-400" />
                                                    </div>
                                                    <p className="text-red-200 font-medium">{result.message}</p>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Optimized Prompt */}
                                                    <div className="space-y-2 flex-1">
                                                        <p className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                                            <Sparkles className="h-3 w-3 text-yellow-300" />
                                                            Optimized Result
                                                        </p>
                                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/90 leading-relaxed font-mono h-full min-h-[120px]">
                                                            {result.optimized}
                                                        </div>
                                                    </div>

                                                    {/* Key Improvements */}
                                                    <div className="space-y-3">
                                                        <p className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                                            <Zap className="h-3 w-3 text-blue-300" />
                                                            Key Improvements
                                                        </p>
                                                        <div className="space-y-2">
                                                            {result.improvements.slice(0, 3).map((improvement, i) => (
                                                                <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                                                                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                                    <span>{improvement}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
