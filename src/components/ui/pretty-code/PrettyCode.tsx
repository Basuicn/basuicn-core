import React, { useState, useEffect, useCallback } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ─── Singleton highlighter ────────────────────────────────────────────────────
let globalHighlighter: Highlighter | null = null;

const getHighlighter = async () => {
    if (globalHighlighter) return globalHighlighter;
    globalHighlighter = await createHighlighter({
        themes: ['nord'],
        langs: ['tsx', 'typescript', 'javascript', 'bash', 'json'],
    });
    return globalHighlighter;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LANG_LABELS: Record<string, string> = {
    tsx: 'TSX',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    bash: 'Bash',
    json: 'JSON',
};

// Fixed widths for loading skeleton rows
const SKELETON_WIDTHS = ['68%', '82%', '54%', '76%', '45%', '60%'];

// ─── Types ────────────────────────────────────────────────────────────────────
interface PrettyCodeProps {
    code: string;
    lang?: string;
    /** Optional filename shown in the header bar */
    filename?: string;
    className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const PrettyCode: React.FC<PrettyCodeProps> = ({
    code,
    lang = 'tsx',
    filename,
    className,
}) => {
    const [nodes, setNodes] = useState<React.ReactNode>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setNodes(null);

        const highlight = async () => {
            try {
                const highlighter = await getHighlighter();
                const html = highlighter.codeToHtml(code, { lang, theme: 'nord' });

                const file = await unified()
                    .use(rehypeParse, { fragment: true })
                    .use(rehypeReact, { ...prod })
                    .process(html);

                if (isMounted) {
                    setNodes(file.result as React.ReactNode);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to highlight code:', err);
                if (isMounted) setLoading(false);
            }
        };

        highlight();
        return () => { isMounted = false; };
    }, [code, lang]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard not available
        }
    }, [code]);

    const langLabel = LANG_LABELS[lang] ?? lang.toUpperCase();

    return (
        <div className={cn('rounded-xl overflow-hidden border border-white/[0.07] bg-[#2e3440] shadow-2xl', className)}>

            {/* ── Header bar ── */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#252b37] border-b border-white/[0.07] select-none">

                {/* Left: window dots + filename */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    {filename && (
                        <span className="text-[11px] text-zinc-400 font-mono truncate leading-none">
                            {filename}
                        </span>
                    )}
                </div>

                {/* Right: language badge + copy button */}
                <div className="flex items-center gap-2 shrink-0 ml-4">
                    <span className="hidden sm:block text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                        {langLabel}
                    </span>

                    <button
                        onClick={handleCopy}
                        aria-label="Copy code"
                        className={cn(
                            'flex items-center gap-1.5 px-2 py-1 rounded-md',
                            'text-xs font-medium transition-all duration-150 active:scale-95',
                            copied
                                ? 'text-emerald-400 bg-emerald-400/10'
                                : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/10',
                        )}
                    >
                        {copied
                            ? <Check className="w-3.5 h-3.5 shrink-0" />
                            : <Copy className="w-3.5 h-3.5 shrink-0" />
                        }
                        <span className="hidden sm:inline w-[42px]">
                            {copied ? 'Copied!' : 'Copy'}
                        </span>
                    </button>
                </div>
            </div>

            {/* ── Code area ── */}
            {loading ? (
                <div className="p-5 space-y-3 animate-pulse" aria-hidden>
                    {SKELETON_WIDTHS.map((w, i) => (
                        <div
                            key={i}
                            className="h-3.5 rounded-full bg-white/[0.08]"
                            style={{ width: w }}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className="overflow-x-auto
                        [&_pre]:!bg-transparent [&_pre]:m-0
                        [&_pre]:px-5 [&_pre]:py-4
                        [&_pre]:text-[13px] [&_pre]:leading-[1.7]
                        [&_code]:font-mono [&_code]:text-[13px]"
                >
                    {nodes}
                </div>
            )}
        </div>
    );
};
