import React, { useState, useEffect } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';

// Singleton highlighter to avoid reloading
let globalHighlighter: Highlighter | null = null;

const getHighlighter = async () => {
    if (globalHighlighter) return globalHighlighter;
    globalHighlighter = await createHighlighter({
        themes: ['nord'],
        langs: ['tsx', 'typescript', 'javascript', 'bash', 'json'],
    });
    return globalHighlighter;
};

interface PrettyCodeProps {
    code: string;
    lang?: string;
    className?: string;
}

export const PrettyCode: React.FC<PrettyCodeProps> = ({ code, lang = 'tsx', className }) => {
    const [nodes, setNodes] = useState<React.ReactNode>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const highlight = async () => {
            try {
                const highlighter = await getHighlighter();
                
                // Use shiki directly to generate HTML
                const html = highlighter.codeToHtml(code, { 
                    lang, 
                    theme: 'nord' 
                });

                const file = await unified()
                    .use(rehypeParse, { fragment: true })
                    .use(rehypeReact, { 
                        ...prod,
                    })
                    .process(html);

                if (isMounted) {
                    setNodes(file.result as React.ReactNode);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to highlight code:', error);
                if (isMounted) setLoading(false);
            }
        };

        highlight();
        return () => { isMounted = false; };
    }, [code, lang]);

    if (loading) {
        return (
            <pre className={`p-6 bg-zinc-950 text-zinc-100/50 text-xs animate-pulse ${className}`}>
                <code>{code}</code>
            </pre>
        );
    }

    return (
        <div className={`pretty-code-wrapper ${className}`}>
            {nodes}
        </div>
    );
};
