'use client'

import { AnalysisResult } from '@/lib/providers/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react'

interface AnalysisDisplayProps {
    analysis: AnalysisResult | null
    isLoading?: boolean
}

export function AnalysisDisplay({ analysis, isLoading }: AnalysisDisplayProps) {
    if (isLoading) {
        return (
            <Card className="glass-card border-white/20 animate-pulse">
                <CardHeader>
                    <div className="h-6 w-1/3 rounded bg-white/10 skeleton" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-32 w-full rounded bg-white/10 skeleton" />
                </CardContent>
            </Card>
        )
    }

    if (!analysis) return null

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'from-green-400 to-emerald-500'
        if (score >= 60) return 'from-yellow-400 to-orange-500'
        return 'from-red-400 to-pink-500'
    }

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent'
        if (score >= 60) return 'Good'
        return 'Needs Improvement'
    }

    return (
        <Card className="glass-card border-white/20 hover:border-white/30 transition-all duration-300 group">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                            <TrendingUp className="h-6 w-6 text-blue-300" />
                        </div>
                        <CardTitle className="text-xl font-bold text-white">
                            Prompt Analysis
                        </CardTitle>
                    </div>

                    {/* Score Badge */}
                    <div className="relative group/score">
                        <div className={`bg-gradient-to-r ${getScoreColor(analysis.score)} px-4 py-2 rounded-xl shadow-lg`}>
                            <div className="text-center">
                                <div className="text-3xl font-black text-white">{analysis.score}</div>
                                <div className="text-xs font-semibold text-white/90">/ 100</div>
                            </div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/score:opacity-100 transition-opacity">
                            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                                {getScoreLabel(analysis.score)}
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Issues Section */}
                {analysis.issues.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-300" />
                            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                                Issues Detected ({analysis.issues.length})
                            </h4>
                        </div>
                        <div className="space-y-2">
                            {analysis.issues.map((issue, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-400/20 hover:bg-red-500/20 transition-colors duration-200 group/issue"
                                >
                                    <div className="mt-0.5 flex-shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-red-400 group-hover/issue:scale-125 transition-transform" />
                                    </div>
                                    <p className="text-sm text-red-100 leading-relaxed font-medium">
                                        {issue}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Suggestions Section */}
                {analysis.suggestions.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-300" />
                            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                                Suggestions ({analysis.suggestions.length})
                            </h4>
                        </div>
                        <div className="space-y-2">
                            {analysis.suggestions.map((suggestion, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 transition-colors duration-200 group/suggestion"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5 group-hover/suggestion:scale-110 transition-transform" />
                                    <p className="text-sm text-blue-100 leading-relaxed font-medium">
                                        {suggestion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Provider Badge */}
                <div className="pt-3 border-t border-white/10">
                    <Badge className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20 transition-colors capitalize">
                        Analyzed by {analysis.provider}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
