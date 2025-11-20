import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { Sparkles, GitCompare, BookTemplate, Activity, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'EasyPrompt - AI Prompt Optimization Platform',
  description:
    'Transform your AI prompts from amateur to professional with instant optimization across multiple AI providers.',
  keywords: [
    'AI',
    'prompt engineering',
    'prompt optimization',
    'ChatGPT',
    'Claude',
    'Gemini',
    'Ollama',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl group transition-all duration-300"
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="gradient-text text-2xl">
                  EasyPrompt
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-2">
                <NavLink href="/" icon={Sparkles}>
                  Optimize
                </NavLink>
                <NavLink href="/compare" icon={GitCompare}>
                  Compare
                </NavLink>
                <NavLink href="/templates" icon={BookTemplate}>
                  Templates
                </NavLink>
                <NavLink href="/providers" icon={Activity}>
                  Providers
                </NavLink>
                <NavLink href="/guide" icon={BookOpen}>
                  Guide
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="animate-in">
          {children}
        </main>

        {/* Footer */}
        <footer className="glass border-t border-white/10 mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="mb-2 font-semibold text-white/90">
                <strong className="gradient-text">EasyPrompt</strong> - AI Prompt Optimization Platform
              </p>
              <p className="text-white/70 text-sm">
                Built with Next.js 16, React 19, TypeScript, and Tailwind CSS
              </p>
              <div className="mt-4 flex justify-center gap-4 text-xs text-white/60">
                <a href="#" className="hover:text-white/90 transition-colors">GitHub</a>
                <span>•</span>
                <a href="#" className="hover:text-white/90 transition-colors">Documentation</a>
                <span>•</span>
                <a href="#" className="hover:text-white/90 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

function NavLink({
  href,
  icon: Icon,
  children
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium group"
    >
      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
      <span>{children}</span>
    </Link>
  )
}
