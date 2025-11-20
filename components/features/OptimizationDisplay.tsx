'use client'

import { OptimizationResult } from '@/lib/providers/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Sparkles, Zap } from 'lucide-react'
import { useState } from 'react'

interface OptimizationDisplayProps {
    optimization: OptimizationResult | null
    isLoading?: boolean
}

export function OptimizationDisplay({ optimization, isLoading }: OptimizationDisplayProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (optimization?.optimized) {
            await navigator.clipboard.writeText(optimization.optimized)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

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

    if (!optimization) return null

    return (
        <Card className="glass-card border-2 border-green-400/30 hover:border-green-400/50 transition-all duration-300 group glow">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                        <Sparkles className="h-6 w-6 text-green-300 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">
                        Optimized Prompt
                    </CardTitle>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-10 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                >
                    {copied ? (
                        <>
                            <Check className="mr-2 h-4 w-4 text-green-300" />
                            <span className="font-semibold">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="mr-2 h-4 w-4" />
                            <span className="font-semibold">Copy</span>
                        </>
                    )}
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Optimized Text */}
                <div className="relative group/text">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl blur-xl group-hover/text:blur-2xl transition-all" />
                    <div className="relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 hover:border-white/30 transition-colors">
                        <p className="font-mono text-base leading-relaxed text-white/95 whitespace-pre-wrap">
                            {optimization.optimized}
                        </p>
                    </div>
                </div>

                {/* Improvements Made */}
                {optimization.improvements.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-300" />
                            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                                Improvements Made ({optimization.improvements.length})
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {optimization.improvements.map((improvement: string, i: number) => (
                                <Badge
                                    key={i}
                                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-100 border border-green-400/30 hover:border-green-400/50 hover:scale-105 transition-all duration-200 px-3 py-1.5 font-semibold"
                                >
                                    <CheckCircle className="h-3 w-3 mr-1.5" />
                                    {improvement}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <Badge className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20 transition-colors capitalize">
                        Optimized by {optimization.provider}
                    </Badge>
                    <span className="text-xs text-white/60 font-mono">
                        {new Date(optimization.timestamp).toLocaleTimeString()}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

function CheckCircle({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
