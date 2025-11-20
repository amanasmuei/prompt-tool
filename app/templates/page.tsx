'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PROMPT_TEMPLATES, PromptTemplate } from '@/lib/prompts/templates'
import { Copy, Check, Search, BookTemplate, Tag, Filter } from 'lucide-react'

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const categories = Array.from(new Set(PROMPT_TEMPLATES.map((t) => t.category)))

    const filteredTemplates = PROMPT_TEMPLATES.filter((template) => {
        const matchesSearch =
            template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory ? template.category === selectedCategory : true
        return matchesSearch && matchesCategory
    })

    const handleCopy = async (template: PromptTemplate) => {
        await navigator.clipboard.writeText(template.template)
        setCopiedId(template.id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-animated">
            {/* Header */}
            <section className="glass border-b border-white/10">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto space-y-6 animate-bounce-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <BookTemplate className="h-5 w-5 text-pink-300" />
                            <span className="text-sm font-semibold text-white">Professional Library</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                            Prompt <span className="gradient-text">Templates</span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                            Curated collection of high-performance prompts for every use case.
                            Copy, customize, and deploy in seconds.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between animate-in">
                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <Button
                                variant="ghost"
                                onClick={() => setSelectedCategory(null)}
                                className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${selectedCategory === null
                                        ? 'bg-white text-purple-600 shadow-lg scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant="ghost"
                                    onClick={() => setSelectedCategory(category)}
                                    className={`rounded-full px-6 py-2 font-semibold capitalize transition-all duration-300 ${selectedCategory === category
                                            ? 'bg-white text-purple-600 shadow-lg scale-105'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-hover:text-white/80 transition-colors" />
                            <Input
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 rounded-full bg-white/10 border-2 border-white/10 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/30 focus:ring-0 transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Templates Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in" style={{ animationDelay: '0.2s' }}>
                        {filteredTemplates.map((template, index) => (
                            <div
                                key={template.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                            >
                                <Card className="h-full glass-card border-white/20 hover:border-white/40 transition-all duration-300 group flex flex-col hover:-translate-y-2 hover:shadow-2xl">
                                    <div className="p-6 flex flex-col h-full">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <Badge className="bg-white/10 text-white border-white/20 px-3 py-1 capitalize font-bold">
                                                {template.category}
                                            </Badge>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleCopy(template)}
                                                className={`h-8 w-8 p-0 rounded-full transition-all duration-300 ${copiedId === template.id
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-white/10 text-white hover:bg-white/20'
                                                    }`}
                                            >
                                                {copiedId === template.id ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-200 transition-colors">
                                            {template.title}
                                        </h3>
                                        <p className="text-white/70 text-sm mb-6 line-clamp-2">
                                            {template.description}
                                        </p>

                                        {/* Preview */}
                                        <div className="mt-auto">
                                            <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-xs text-white/60 font-mono line-clamp-3 mb-4 group-hover:bg-black/30 transition-colors">
                                                {template.template}
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {template.tags.map((tag) => (
                                                    <div
                                                        key={tag}
                                                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-1 rounded-lg"
                                                    >
                                                        <Tag className="h-3 w-3" />
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-20 animate-in">
                            <div className="inline-block p-6 rounded-full bg-white/5 mb-4">
                                <Search className="h-12 w-12 text-white/30" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
                            <p className="text-white/60">Try adjusting your search or category filters</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
