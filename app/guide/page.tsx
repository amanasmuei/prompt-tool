'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Lightbulb, AlertTriangle, CheckCircle2, Code2, Sparkles, ArrowRight, Target, Zap } from 'lucide-react'

export default function GuidePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-animated">
            {/* Header */}
            <section className="glass border-b border-white/10">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto space-y-6 animate-bounce-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <BookOpen className="h-5 w-5 text-yellow-300" />
                            <span className="text-sm font-semibold text-white">Master Class</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                            Prompt <span className="gradient-text">Engineering</span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                            Learn the art and science of crafting effective prompts for AI models.
                            From basics to advanced techniques.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Core Principles */}
                    <div className="space-y-6 animate-in">
                        <SectionHeader icon={Target} title="Core Principles" />
                        <div className="grid md:grid-cols-2 gap-6">
                            <PrincipleCard
                                title="Clarity & Specificity"
                                description="Be precise about what you want. Avoid ambiguity and vague instructions."
                                icon={CheckCircle2}
                                color="green"
                            />
                            <PrincipleCard
                                title="Context is King"
                                description="Provide background information, role, and constraints to guide the AI."
                                icon={Lightbulb}
                                color="yellow"
                            />
                            <PrincipleCard
                                title="Format & Structure"
                                description="Define the desired output format (JSON, Markdown, List) explicitly."
                                icon={Code2}
                                color="blue"
                            />
                            <PrincipleCard
                                title="Iterative Refinement"
                                description="Start simple, then refine based on the output. It's a conversation."
                                icon={RefreshCw}
                                color="purple"
                            />
                        </div>
                    </div>

                    {/* Good vs Bad Examples */}
                    <div className="space-y-6 animate-in" style={{ animationDelay: '0.2s' }}>
                        <SectionHeader icon={Zap} title="Good vs. Bad Prompts" />
                        <div className="space-y-4">
                            <ComparisonCard
                                bad="Write a blog post about AI."
                                good="Write a 1500-word technical blog post about the impact of Large Language Models on software development productivity. Target audience is senior engineers. Use a professional but engaging tone. Include 3 code examples."
                                explanation="The good prompt specifies length, topic, audience, tone, and content requirements."
                            />
                            <ComparisonCard
                                bad="Fix this code."
                                good="Analyze this Python function for time complexity and memory leaks. Suggest optimizations to reduce execution time by 50%. Explain your changes with comments."
                                explanation="The good prompt defines the specific type of analysis and the goal of the optimization."
                            />
                        </div>
                    </div>

                    {/* Advanced Techniques */}
                    <div className="space-y-6 animate-in" style={{ animationDelay: '0.3s' }}>
                        <SectionHeader icon={Sparkles} title="Advanced Techniques" />
                        <div className="grid gap-6">
                            <TechniqueCard
                                title="Few-Shot Prompting"
                                description="Provide examples of inputs and desired outputs to teach the model the pattern."
                                example={`User: "Convert to emoji: Happy" -> AI: "😊"
User: "Convert to emoji: Sad" -> AI: "😢"
User: "Convert to emoji: Excited" -> AI: ?`}
                            />
                            <TechniqueCard
                                title="Chain of Thought"
                                description="Ask the model to explain its reasoning step-by-step before giving the final answer."
                                example={`"Let's think step by step. First, identify the key variables..."`}
                            />
                            <TechniqueCard
                                title="Role Prompting"
                                description="Assign a specific persona to the AI to influence tone and expertise."
                                example={`"Act as a senior React developer with 10 years of experience..."`}
                            />
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType, title: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-white/10">
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white drop-shadow-md">{title}</h2>
        </div>
    )
}

function PrincipleCard({
    title,
    description,
    icon: Icon,
    color
}: {
    title: string
    description: string
    icon: React.ElementType
    color: 'green' | 'yellow' | 'blue' | 'purple'
}) {
    const colors = {
        green: 'text-green-300 bg-green-500/20',
        yellow: 'text-yellow-300 bg-yellow-500/20',
        blue: 'text-blue-300 bg-blue-500/20',
        purple: 'text-purple-300 bg-purple-500/20',
    }

    return (
        <Card className="glass-card border-white/20 p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className={`inline-block p-3 rounded-xl ${colors[color]} mb-4`}>
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/70 leading-relaxed">{description}</p>
        </Card>
    )
}

function ComparisonCard({ bad, good, explanation }: { bad: string, good: string, explanation: string }) {
    return (
        <Card className="glass-card border-white/20 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="p-6 bg-red-500/5">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <span className="font-bold text-red-300 uppercase tracking-wider text-sm">Weak Prompt</span>
                    </div>
                    <p className="text-white/90 font-medium font-mono text-sm bg-black/20 p-4 rounded-lg border border-white/5">
                        "{bad}"
                    </p>
                </div>
                <div className="p-6 bg-green-500/5">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <span className="font-bold text-green-300 uppercase tracking-wider text-sm">Strong Prompt</span>
                    </div>
                    <p className="text-white/90 font-medium font-mono text-sm bg-black/20 p-4 rounded-lg border border-white/5">
                        "{good}"
                    </p>
                </div>
            </div>
            <div className="p-4 bg-white/5 border-t border-white/10">
                <div className="flex items-start gap-2 text-sm text-white/70">
                    <Lightbulb className="h-4 w-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>{explanation}</span>
                </div>
            </div>
        </Card>
    )
}

function TechniqueCard({ title, description, example }: { title: string, description: string, example: string }) {
    return (
        <Card className="glass-card border-white/20 p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        {title}
                        <Badge variant="outline" className="border-purple-400/30 text-purple-300 text-xs">Advanced</Badge>
                    </h3>
                    <p className="text-white/70 mb-4 leading-relaxed">{description}</p>
                </div>
                <div className="flex-1">
                    <div className="bg-black/30 rounded-xl p-4 border border-white/10 font-mono text-sm text-white/80 whitespace-pre-wrap">
                        {example}
                    </div>
                </div>
            </div>
        </Card>
    )
}

function RefreshCw({ className }: { className?: string }) {
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
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
        </svg>
    )
}
