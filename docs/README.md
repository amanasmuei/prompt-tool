# EasyPrompt Documentation

Welcome to the EasyPrompt documentation! This guide will help you navigate all available documentation.

---

## 🚀 Getting Started

New to EasyPrompt? Start here:

### Quick Start
- **[Getting Started Guide](./getting-started/README.md)** - Complete setup guide for new users
- **[Docker Setup Guide](./getting-started/docker-setup.md)** - Docker deployment and configuration

### First Steps
1. Choose your installation method (Docker or Node.js)
2. Configure at least one AI provider
3. Start the development server
4. Begin optimizing prompts!

---

## 📚 User Guides

### Deployment & Operations
- **[Deployment Guide](./guides/deployment.md)** - Deploy to production (Vercel, Docker)
- **[Contributing Guide](./guides/contributing.md)** - How to contribute to the project

### Features
- **Prompt Optimization** - Transform amateur prompts to professional quality
- **Multi-Provider Comparison** - Compare results across different AI providers
- **Template Library** - Browse 50+ ready-to-use templates
- **Provider Health Monitoring** - Real-time provider status and diagnostics
- **User Authentication** - Secure account management with encrypted API keys

---

## 🏗️ Architecture & Technical Documentation

For developers and those interested in the technical details:

- **[Technical Architecture](./architecture/README.md)** - Complete system architecture
- **[Architecture Diagrams](./architecture/diagrams/)** - Visual system diagrams

### Key Architectural Components

**Frontend:**
- Next.js 16 with Turbopack
- React 19.2 with Server Components
- Tailwind CSS 4 for styling
- Shadcn/UI components

**Backend:**
- Server Actions for API logic
- Multi-provider AI adapter system
- PostgreSQL for data persistence
- Redis for caching and rate limiting

**Security:**
- AES-256-GCM encryption for API keys
- Bcrypt password hashing
- NextAuth v5 for authentication
- HTTP-only cookies for sessions

---

## 🗂️ Documentation Structure

```
docs/
├── README.md                      # This file - documentation index
│
├── getting-started/               # Setup and installation guides
│   ├── README.md                  # Main getting started guide
│   └── docker-setup.md            # Docker-specific setup
│
├── guides/                        # User and developer guides
│   ├── contributing.md            # How to contribute
│   └── deployment.md              # Production deployment
│
├── architecture/                  # Technical architecture
│   ├── README.md                  # Architecture overview
│   └── diagrams/                  # Architecture diagrams
│       └── architecture-diagram.png
│
└── archive/                       # Historical documentation
    ├── internal/                  # Old internal project docs
    ├── IMPLEMENTATION_PLAN.md     # Original implementation plan
    ├── IMPLEMENTATION_SUMMARY.md  # Implementation summary
    └── PROVIDER_MANAGEMENT_STATUS.md
```

---

## 🔍 Quick Links by Topic

### Installation & Setup
- [Node.js Installation](./getting-started/README.md#installation)
- [Docker Installation](./getting-started/docker-setup.md#quick-start)
- [Database Setup](./getting-started/docker-setup.md#database-setup)
- [Environment Configuration](./getting-started/README.md#provider-configuration)

### Configuration
- [AI Provider Setup](./getting-started/README.md#provider-configuration)
- [Environment Variables](./getting-started/docker-setup.md#environment-variables)
- [Database Configuration](./getting-started/docker-setup.md#database-configuration)
- [Security Settings](./architecture/README.md#security)

### Deployment
- [Docker Deployment](./getting-started/docker-setup.md#production-deployment)
- [Vercel Deployment](./guides/deployment.md#vercel-deployment)
- [Environment Variables](./guides/deployment.md#environment-variables-setup)
- [Production Best Practices](./getting-started/docker-setup.md#best-practices)

### Development
- [Contributing Guidelines](./guides/contributing.md)
- [Code Style](./guides/contributing.md#code-style)
- [Testing](./guides/contributing.md#testing)
- [Pull Request Process](./guides/contributing.md#pull-request-process)

### Troubleshooting
- [Common Issues](./getting-started/README.md#troubleshooting)
- [Docker Troubleshooting](./getting-started/docker-setup.md#troubleshooting)
- [Database Issues](./getting-started/docker-setup.md#database-connection-issues)

---

## 🆘 Getting Help

### Documentation Issues
If you can't find what you're looking for or notice documentation errors:
- [Open a documentation issue](https://github.com/amanasmuei/easyprompt/issues/new?labels=documentation)
- [Start a discussion](https://github.com/amanasmuei/easyprompt/discussions)

### Technical Support
- **Bug Reports:** [GitHub Issues](https://github.com/amanasmuei/easyprompt/issues)
- **Questions:** [GitHub Discussions](https://github.com/amanasmuei/easyprompt/discussions)
- **Feature Requests:** [GitHub Issues](https://github.com/amanasmuei/easyprompt/issues/new?labels=enhancement)

---

## 📖 Additional Resources

### External Documentation
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### AI Provider Documentation
- [Anthropic Claude API](https://docs.anthropic.com/)
- [OpenAI API](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [Ollama Documentation](https://github.com/ollama/ollama/blob/main/docs/)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference/)

---

## 🔄 Documentation Updates

This documentation is continuously updated. Last major update: **2025-11-21**

### Recent Changes
- ✅ Consolidated multiple getting-started guides into single comprehensive guide
- ✅ Created dedicated Docker setup guide
- ✅ Reorganized documentation structure for better discoverability
- ✅ Moved architecture docs to dedicated section
- ✅ Archived outdated internal documentation
- ✅ Updated all cross-references and links

### Contributing to Documentation
Help us improve the documentation! See our [Contributing Guide](./guides/contributing.md#documentation) for details on how to contribute.

---

## 📝 Documentation Versions

- **Current (v1.0.0-beta.1):** Latest beta release documentation
- **Archive:** Historical documentation available in [./archive/](./archive/)

---

**Need something specific?** Use your browser's search function (Ctrl/Cmd + F) to search this page, or explore the documentation structure above.
