'use client'

import { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Wand2, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PromptInputProps {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
    isAnalyzing: boolean
    maxLength?: number
}

export function PromptInput({
    value,
    onChange,
    onSubmit,
    isAnalyzing,
    maxLength = 2000,
}: PromptInputProps) {
    const [charCount, setCharCount] = useState(0)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        setCharCount(value.length)
    }, [value])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            onSubmit()
        }
    }

    const percentage = (charCount / maxLength) * 100

    return (
        <Card className={cn(
            "glass-card border-2 p-1 transition-all duration-300",
            isFocused ? "border-white/40 shadow-2xl scale-[1.01]" : "border-white/20"
        )}>
            <div className="relative">
                <Textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter your prompt here... ✨ (Cmd+Enter to optimize)"
                    className="min-h-[220px] resize-none border-0 bg-transparent text-lg text-white placeholder:text-white/50 focus-visible:ring-0 font-medium leading-relaxed p-6"
                    maxLength={maxLength}
                />

                {/* Character Counter and Submit Button */}
                <div className="absolute bottom-4 left-0 right-0 px-6 flex items-center justify-between">
                    {/* Character Counter with Progress */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-sm font-bold transition-colors tabular-nums",
                                charCount > maxLength * 0.9
                                    ? "text-red-300"
                                    : charCount > maxLength * 0.7
                                        ? "text-yellow-300"
                                        : "text-white/70"
                            )}>
                                {charCount} / {maxLength}
                            </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full transition-all duration-300 rounded-full",
                                    percentage > 90
                                        ? "bg-gradient-to-r from-red-400 to-red-600"
                                        : percentage > 70
                                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                            : "bg-gradient-to-r from-blue-400 to-purple-500"
                                )}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={onSubmit}
                        disabled={!value.trim() || isAnalyzing}
                        className={cn(
                            "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-xl transition-all duration-300",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            !isAnalyzing && value.trim() && "hover:scale-105 hover:shadow-2xl glow"
                        )}
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-5 w-5" />
                                <span>Optimize</span>
                                <Sparkles className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    )
}
