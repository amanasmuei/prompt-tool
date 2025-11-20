'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { checkHealth } from '@/lib/actions/health'
import { discoverModels } from '@/lib/actions/discover-models'
import { ProviderInfo, HealthStatus } from '@/lib/providers/types'
import { useProvider } from '@/components/hooks/use-provider'
import { Activity, Server, RefreshCw, Shield, Zap, Globe, Database, Cpu, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'

export default function ProvidersPage() {
    const { providers, isLoading: providersLoading } = useProvider()
    const [healthStatuses, setHealthStatuses] = useState<Record<string, HealthStatus>>({})
    const [checking, setChecking] = useState<Record<string, boolean>>({})
    const [discovering, setDiscovering] = useState(false)

    useEffect(() => {
        // Initial health check for all providers
        providers.forEach(provider => {
            checkProviderHealth(provider.name)
        })
    }, [providers])

    const checkProviderHealth = async (providerName: string) => {
        setChecking(prev => ({ ...prev, [providerName]: true }))
        try {
            const status = await checkHealth(providerName)
            setHealthStatuses(prev => ({ ...prev, [providerName]: status }))
        } catch (error) {
            console.error(`Health check failed for ${providerName}:`, error)
        } finally {
            setChecking(prev => ({ ...prev, [providerName]: false }))
        }
    }

    const handleDiscoverModels = async () => {
        setDiscovering(true)
        try {
            await discoverModels('ollama')
            // Refresh health check for Ollama
            await checkProviderHealth('ollama')
        } catch (error) {
            console.error('Model discovery failed:', error)
        } finally {
            setDiscovering(false)
        }
    }

    const getStatusColor = (status?: HealthStatus) => {
        if (!status) return 'text-gray-400'
        if (status.available) return 'text-green-400'
        return 'text-red-400'
    }

    const getLatencyColor = (latency: number) => {
        if (latency < 500) return 'text-green-400'
        if (latency < 1500) return 'text-yellow-400'
        return 'text-red-400'
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-animated">
            {/* Header */}
            <section className="glass border-b border-white/10">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto space-y-6 animate-bounce-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <Activity className="h-5 w-5 text-green-300" />
                            <span className="text-sm font-semibold text-white">System Status</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                            Provider <span className="gradient-text">Health</span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                            Real-time monitoring of AI model availability, latency, and capabilities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-in">
                        <StatCard
                            label="Total Providers"
                            value={providers.length}
                            icon={Server}
                            color="blue"
                        />
                        <StatCard
                            label="Active Models"
                            value={providers.reduce((acc, p) => acc + p.models.length, 0)}
                            icon={Cpu}
                            color="purple"
                        />
                        <StatCard
                            label="Avg Latency"
                            value="~450ms"
                            icon={Zap}
                            color="yellow"
                        />
                        <StatCard
                            label="System Status"
                            value="Healthy"
                            icon={Shield}
                            color="green"
                        />
                    </div>

                    {/* Providers Grid */}
                    <div className="grid md:grid-cols-2 gap-6 animate-in" style={{ animationDelay: '0.2s' }}>
                        {providers.map((provider, index) => {
                            const status = healthStatuses[provider.name]
                            const isChecking = checking[provider.name]

                            return (
                                <div
                                    key={provider.name}
                                    className="animate-slide-up"
                                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                                >
                                    <Card className="glass-card border-white/20 hover:border-white/40 transition-all duration-300 group">
                                        <div className="p-6 space-y-6">
                                            {/* Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                                                        {provider.name === 'ollama' ? '🦙' :
                                                            provider.name === 'anthropic' ? '🧠' :
                                                                provider.name === 'openai' ? '🤖' : '🌐'}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white">
                                                            {provider.displayName}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="outline" className="border-white/20 text-white/70 text-xs uppercase tracking-wider">
                                                                {provider.category}
                                                            </Badge>
                                                            {provider.location === 'local' && (
                                                                <Badge variant="outline" className="border-green-400/30 text-green-300 text-xs uppercase tracking-wider bg-green-500/10">
                                                                    Local
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => checkProviderHealth(provider.name)}
                                                    disabled={isChecking}
                                                    className="h-10 w-10 p-0 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
                                                >
                                                    <RefreshCw className={`h-5 w-5 ${isChecking ? 'animate-spin' : ''}`} />
                                                </Button>
                                            </div>

                                            {/* Status Grid */}
                                            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                                                <div className="space-y-1">
                                                    <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Status</span>
                                                    <div className="flex items-center gap-2">
                                                        {status?.available ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                                                        ) : (
                                                            <XCircle className="h-4 w-4 text-red-400" />
                                                        )}
                                                        <span className={`font-bold ${getStatusColor(status)}`}>
                                                            {status?.available ? 'Operational' : 'Unavailable'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Latency</span>
                                                    <div className="flex items-center gap-2">
                                                        <Activity className="h-4 w-4 text-white/40" />
                                                        <span className={`font-mono font-bold ${getLatencyColor(status?.latency || 0)}`}>
                                                            {status?.latency ? `${status.latency}ms` : '--'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Capabilities */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider">Capabilities</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {provider.capabilities.streaming && (
                                                        <CapabilityBadge icon={Zap} label="Streaming" />
                                                    )}
                                                    {provider.capabilities.vision && (
                                                        <CapabilityBadge icon={Globe} label="Vision" />
                                                    )}
                                                    {provider.capabilities.functionCalling && (
                                                        <CapabilityBadge icon={Database} label="Functions" />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Models List */}
                                            <div className="space-y-3 pt-4 border-t border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider">
                                                        Available Models ({provider.models.length})
                                                    </h4>
                                                    {provider.supportsModelDiscovery && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={handleDiscoverModels}
                                                            disabled={discovering}
                                                            className="h-6 text-xs px-2 text-blue-300 hover:text-blue-200 hover:bg-blue-500/20"
                                                        >
                                                            {discovering ? 'Scanning...' : 'Scan Local'}
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {provider.models.map((model) => (
                                                        <span
                                                            key={model.id}
                                                            className="text-xs font-mono text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5"
                                                        >
                                                            {model.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Error Message */}
                                            {status?.error && (
                                                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                                                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                                                    {status.error}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

function StatCard({
    label,
    value,
    icon: Icon,
    color
}: {
    label: string
    value: string | number
    icon: React.ElementType
    color: 'blue' | 'purple' | 'yellow' | 'green'
}) {
    const colors = {
        blue: 'text-blue-300 bg-blue-500/20',
        purple: 'text-purple-300 bg-purple-500/20',
        yellow: 'text-yellow-300 bg-yellow-500/20',
        green: 'text-green-300 bg-green-500/20',
    }

    return (
        <Card className="glass-card border-white/20 p-6 flex items-center gap-4 hover:scale-105 transition-transform duration-300">
            <div className={`p-3 rounded-xl ${colors[color]}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-bold text-white/60 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-black text-white">{value}</p>
            </div>
        </Card>
    )
}

function CapabilityBadge({ icon: Icon, label }: { icon: React.ElementType, label: string }) {
    return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80">
            <Icon className="h-3.5 w-3.5" />
            {label}
        </div>
    )
}
