export interface PromptTemplate {
    id: string
    title: string
    category: 'writing' | 'coding' | 'analysis' | 'creative' | 'education'
    description: string
    prompt: string
    tags: string[]
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
    // WRITING
    {
        id: 'blog-post-generator',
        title: 'SEO Blog Post Generator',
        category: 'writing',
        description: 'Create a comprehensive, SEO-optimized blog post.',
        tags: ['seo', 'blog', 'content-marketing'],
        prompt: `You are an expert SEO content writer. Write a comprehensive blog post about [TOPIC].
    
Requirements:
- Target Audience: [AUDIENCE]
- Tone: Professional yet engaging
- Length: 1500+ words
- Structure:
  1. Catchy Title
  2. Introduction with a hook
  3. Key Takeaways (bullet points)
  4. Detailed Body Paragraphs with H2 and H3 headers
  5. Conclusion with a Call to Action (CTA)
- SEO: Include keywords naturally. Use short paragraphs.
`,
    },
    {
        id: 'email-newsletter',
        title: 'Engaging Email Newsletter',
        category: 'writing',
        description: 'Draft a newsletter that drives clicks.',
        tags: ['email', 'marketing', 'copywriting'],
        prompt: `Act as a senior email marketer. Write a newsletter about [TOPIC].
    
Goal: Drive clicks to [DESTINATION].
    
Structure:
1. Subject Line: 3 variations (Curiosity, Benefit, Urgency)
2. Preheader text
3. Personal greeting
4. Story/Hook related to the topic
5. Value proposition
6. Clear CTA button text
7. P.S. with a secondary hook
`,
    },

    // CODING
    {
        id: 'code-refactoring',
        title: 'Code Refactoring Expert',
        category: 'coding',
        description: 'Optimize and clean up existing code.',
        tags: ['refactoring', 'clean-code', 'optimization'],
        prompt: `You are a Senior Software Engineer. Refactor the following code to improve readability, performance, and maintainability.
    
Code:
\`\`\`
[INSERT CODE HERE]
\`\`\`

Instructions:
1. Analyze the code for potential bugs and inefficiencies.
2. Apply Clean Code principles (DRY, SOLID).
3. Add comments explaining complex logic.
4. Provide the refactored code in a single block.
5. List the specific improvements made.
`,
    },
    {
        id: 'unit-test-generator',
        title: 'Unit Test Generator',
        category: 'coding',
        description: 'Generate comprehensive unit tests.',
        tags: ['testing', 'jest', 'vitest'],
        prompt: `Act as a QA Engineer. Write comprehensive unit tests for the following function using [FRAMEWORK, e.g., Jest].
    
Function:
\`\`\`
[INSERT CODE HERE]
\`\`\`

Requirements:
- Cover happy paths.
- Cover edge cases (null, undefined, empty inputs).
- Cover error states.
- Use descriptive test names.
`,
    },

    // ANALYSIS
    {
        id: 'data-summarization',
        title: 'Executive Summary Generator',
        category: 'analysis',
        description: 'Summarize complex text for executives.',
        tags: ['summary', 'business', 'executive'],
        prompt: `You are an Executive Assistant. Summarize the following text for a busy CEO.
    
Text:
"""
[INSERT TEXT HERE]
"""

Output Format:
1. **One-Sentence Bottom Line**: The most important takeaway.
2. **Key Points**: 3-5 bullet points.
3. **Action Items**: What needs to be done?
4. **Risks/Opportunities**: Brief analysis.
`,
    },

    // CREATIVE
    {
        id: 'brainstorming-partner',
        title: 'Creative Brainstorming',
        category: 'creative',
        description: 'Generate unique ideas for any project.',
        tags: ['ideas', 'brainstorming', 'innovation'],
        prompt: `Act as a Creative Director. Brainstorm 10 unique and innovative ideas for [PROJECT/PROBLEM].
    
Constraints:
- Think outside the box (lateral thinking).
- Aim for variety in approach.
- For each idea, provide a 1-sentence "Pitch" and a "Why it works" explanation.
`,
    },

    // EDUCATION
    {
        id: 'feynman-technique',
        title: 'Explain Like I\'m 5 (Feynman)',
        category: 'education',
        description: 'Explain complex topics simply.',
        tags: ['learning', 'explanation', 'simplification'],
        prompt: `Explain [TOPIC] using the Feynman Technique.
    
Steps:
1. Explain the concept in simple language (as if to a 12-year-old).
2. Use an analogy from everyday life.
3. Identify and clarify any jargon.
4. Review and simplify further.
`,
    },
]
