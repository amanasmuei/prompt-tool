'use client'

import React from 'react'
import { Select } from '@/components/ui/select'
import { ProviderInfo, ProviderType } from '@/lib/providers/types'
import { Badge } from '@/components/ui/badge'
import { Server, Zap, Globe, Monitor, Loader2 } from 'lucide-react'

interface ProviderSelectorProps {
    providers: ProviderInfo[]
    selectedProvider: ProviderType
    selectedModel: string
    onProviderChange: (provider: ProviderType) => void
    onModelChange: (model: string) => void
    disabled?: boolean
    isLoading?: boolean
}

export function ProviderSelector({
    providers,
    selectedProvider,
    selectedModel,
    onProviderChange,
    onModelChange,
    disabled,
    isLoading,
}: ProviderSelectorProps) {
    const activeProvider = providers.find((p) => p.name === selectedProvider)
    const models = activeProvider?.models || []

    const getCategoryIcon = (category: string) => {
        return category === 'commercial' ? Globe : Monitor
    }

    const getCategoryColor = (category: string) => {
        return category === 'commercial'
            ? 'from-blue-500 to-cyan-500'
            : 'from-green-500 to-emerald-500'
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <Server className="h-6 w-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white">
                    Provider Settings
                </h3>
                {isLoading && (
                    <Loader2 className="h-5 w-5 text-white/60 animate-spin" />
                )}
            </div>

            {/* Selectors in Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
                {/* Provider Selector */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                        AI Provider
                    </label>
                    <div className="relative group">
                        <Select
                            value={selectedProvider}
                            onChange={(e) => onProviderChange(e.target.value as ProviderType)}
                            disabled={disabled || isLoading}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white font-semibold hover:bg-white/15 hover:border-white/30 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {providers.map((provider) => (
                                <option
                                    key={provider.name}
                                    value={provider.name}
                                    className="bg-slate-800 text-white"
                                >
                                    {provider.displayName} {!provider.available && '(Unavailable)'}
                                </option>
                            ))}
                        </Select>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                    </div>
                </div>

                {/* Model Selector */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                        Model
                    </label>
                    <div className="relative group">
                        <Select
                            value={selectedModel}
                            onChange={(e) => onModelChange(e.target.value)}
                            disabled={disabled || models.length === 0 || isLoading}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white font-semibold hover:bg-white/15 hover:border-white/30 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {models.map((model) => (
                                <option
                                    key={model.id}
                                    value={model.id}
                                    className="bg-slate-800 text-white"
                                >
                                    {model.name} ({model.tier})
                                </option>
                            ))}
                        </Select>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                    </div>
                </div>
            </div>

            {/* Provider Info Badges */}
            {activeProvider && (
                <div className="flex flex-wrap gap-2 pt-2">
                    {/* Category Badge */}
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(activeProvider.category)} text-white border-0 px-3 py-1.5 font-semibold hover:scale-105 transition-transform`}>
                        {React.createElement(getCategoryIcon(activeProvider.category), { className: 'h-3.5 w-3.5 mr-1.5' })}
                        {activeProvider.category}
                    </Badge>

                    {/* Location Badge */}
                    <Badge className="bg-white/10 text-white border border-white/20 hover:bg-white/15 px-3 py-1.5 font-semibold hover:scale-105 transition-transform capitalize">
                        {activeProvider.location}
                    </Badge>

                    {/* Capabilities */}
                    {activeProvider.capabilities.vision && (
                        <Badge className="bg-purple-500/20 text-purple-100 border border-purple-400/30 hover:bg-purple-500/30 px-3 py-1.5 font-semibold hover:scale-105 transition-transform">
                            👁️ Vision
                        </Badge>
                    )}

                    {activeProvider.capabilities.streaming && (
                        <Badge className="bg-blue-500/20 text-blue-100 border border-blue-400/30 hover:bg-blue-500/30 px-3 py-1.5 font-semibold hover:scale-105 transition-transform">
                            <Zap className="h-3.5 w-3.5 mr-1.5" />
                            Streaming
                        </Badge>
                    )}

                    {/* Model Count */}
                    <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-100 border border-indigo-400/30 hover:bg-indigo-500/30 px-3 py-1.5 font-semibold hover:scale-105 transition-transform">
                        📊 {activeProvider.models.length} models
                    </Badge>
                </div>
            )}
        </div>
    )
}
