import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useCopy } from '@/hooks/useCopy';

// ─── Shared text style variants ───────────────────────────────────────────────

const textVariants = tv({
  base: '',
  variants: {
    size: {
      xs:   'text-xs',
      sm:   'text-sm',
      md:   'text-base',
      lg:   'text-lg',
      xl:   'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
    weight: {
      thin:      'font-thin',
      light:     'font-light',
      normal:    'font-normal',
      medium:    'font-medium',
      semibold:  'font-semibold',
      bold:      'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      default: 'text-foreground',
      muted:   'text-muted-foreground',
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      danger:  'text-danger',
      inherit: 'text-inherit',
    },
    align: {
      left:    'text-left',
      center:  'text-center',
      right:   'text-right',
      justify: 'text-justify',
    },
    leading: {
      none:    'leading-none',
      tight:   'leading-tight',
      normal:  'leading-normal',
      relaxed: 'leading-relaxed',
      loose:   'leading-loose',
    },
    tracking: {
      tighter: 'tracking-tighter',
      tight:   'tracking-tight',
      normal:  'tracking-normal',
      wide:    'tracking-wide',
      widest:  'tracking-widest',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

// ─── Text ─────────────────────────────────────────────────────────────────────

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  /** HTML tag to render — default `span` */
  as?: React.ElementType;
  /** Bold */
  strong?: boolean;
  /** Italic */
  italic?: boolean;
  /** Underline */
  underline?: boolean;
  /** Strikethrough */
  strikethrough?: boolean;
  /** Gradient text (primary → indigo) */
  gradient?: boolean;
  /** Highlighted mark background */
  mark?: boolean;
  /** Single-line truncate with ellipsis */
  truncate?: boolean;
  /** Multi-line clamp (number of lines) */
  lines?: 1 | 2 | 3 | 4 | 5;
  /** Tabular numbers — fixed-width digits */
  numeric?: boolean;
  /** Inline code styling */
  code?: boolean;
  /** Show copy icon on hover, copies text content on click */
  copyable?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const LINES_MAP: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
};

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Tag = 'span',
      size,
      weight,
      color,
      align,
      leading,
      tracking,
      strong,
      italic,
      underline,
      strikethrough,
      gradient,
      mark,
      truncate,
      lines,
      numeric,
      code,
      copyable,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { copied, copy } = useCopy();
    const elRef = React.useRef<HTMLElement>(null);
    const mergedRef = (node: HTMLElement | null) => {
      (elRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (copyable && elRef.current) {
        copy(elRef.current.innerText);
      }
      onClick?.(e);
    };

    return (
      <Tag
        ref={mergedRef}
        className={cn(
          textVariants({ size, weight, color, align, leading, tracking }),
          strong       && 'font-bold',
          italic       && 'italic',
          underline    && 'underline underline-offset-2',
          strikethrough && 'line-through',
          gradient     && 'bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent',
          mark         && 'bg-warning/20 text-warning-foreground rounded px-0.5',
          truncate     && 'block max-w-full truncate',
          lines        && cn('block', LINES_MAP[lines]),
          numeric      && 'tabular-nums',
          code         && 'font-mono text-[0.9em] bg-muted rounded px-1 py-0.5 border border-border/50',
          copyable     && 'cursor-pointer group/copy inline-flex items-center gap-1.5',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {copyable && (
          <span className="opacity-0 group-hover/copy:opacity-60 transition-opacity shrink-0">
            {copied
              ? <Check className="w-3.5 h-3.5 text-success" />
              : <Copy className="w-3.5 h-3.5" />
            }
          </span>
        )}
      </Tag>
    );
  }
);
Text.displayName = 'Text';

// ─── Heading ──────────────────────────────────────────────────────────────────

const HEADING_SIZE: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'text-4xl font-extrabold tracking-tight',
  2: 'text-3xl font-bold tracking-tight',
  3: 'text-2xl font-semibold tracking-tight',
  4: 'text-xl font-semibold',
  5: 'text-lg font-medium',
  6: 'text-base font-medium',
};

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof textVariants> {
  /** Heading level 1–6, also sets default size (default: 2) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Show copy icon on hover */
  copyable?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size, weight, color = 'default', align, className, copyable, children, ...props }, ref) => {
    const Tag = `h${level}` as React.ElementType;
    const { copied, copy } = useCopy();
    const elRef = React.useRef<HTMLHeadingElement>(null);
    const mergedRef = (node: HTMLHeadingElement | null) => {
      (elRef as React.MutableRefObject<HTMLHeadingElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLHeadingElement | null>).current = node;
    };

    return (
      <Tag
        ref={mergedRef}
        className={cn(
          HEADING_SIZE[level],
          textVariants({ size, weight, color, align }),
          copyable && 'cursor-pointer group/copy inline-flex items-center gap-2',
          className,
        )}
        onClick={copyable ? () => elRef.current && copy(elRef.current.innerText) : undefined}
        {...props}
      >
        {children}
        {copyable && (
          <span className="opacity-0 group-hover/copy:opacity-50 transition-opacity shrink-0">
            {copied
              ? <Check className="w-4 h-4 text-success" />
              : <Copy className="w-4 h-4" />
            }
          </span>
        )}
      </Tag>
    );
  }
);
Heading.displayName = 'Heading';

// ─── Paragraph ────────────────────────────────────────────────────────────────

export interface ParagraphProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  /** Larger intro-text styling */
  lead?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ lead, size, weight, color = 'default', align, leading = 'relaxed', className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        textVariants({ size, weight, color, align, leading }),
        lead && 'text-xl text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
);
Paragraph.displayName = 'Paragraph';

// ─── Lead ────────────────────────────────────────────────────────────────────

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-xl text-muted-foreground leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  )
);
Lead.displayName = 'Lead';

// ─── Blockquote ───────────────────────────────────────────────────────────────

export interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  /** Citation source text shown below the quote */
  cite?: string;
  className?: string;
  children?: React.ReactNode;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ cite, className, children, ...props }, ref) => (
    <figure className="my-1">
      <blockquote
        ref={ref}
        className={cn(
          'border-l-4 border-primary pl-4 py-1 italic text-muted-foreground leading-relaxed',
          className,
        )}
        {...props}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-2 pl-4 text-sm text-muted-foreground/70 not-italic">
          — {cite}
        </figcaption>
      )}
    </figure>
  )
);
Blockquote.displayName = 'Blockquote';

// ─── Code (inline) ────────────────────────────────────────────────────────────

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** Copy content on click */
  copyable?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ copyable, className, children, ...props }, ref) => {
    const { copied, copy } = useCopy();
    const elRef = React.useRef<HTMLElement>(null);
    const mergedRef = (node: HTMLElement | null) => {
      (elRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    return (
      <code
        ref={mergedRef}
        onClick={copyable ? () => elRef.current && copy(elRef.current.innerText) : undefined}
        className={cn(
          'font-mono text-[0.875em] bg-muted text-foreground rounded px-1.5 py-0.5 border border-border/50',
          copyable && 'cursor-pointer hover:bg-muted/70 transition-colors group/code inline-flex items-center gap-1',
          className,
        )}
        {...props}
      >
        {children}
        {copyable && (
          <span className="opacity-0 group-hover/code:opacity-60 transition-opacity">
            {copied
              ? <Check className="w-3 h-3 text-success inline" />
              : <Copy className="w-3 h-3 inline" />
            }
          </span>
        )}
      </code>
    );
  }
);
Code.displayName = 'Code';

// ─── Kbd ──────────────────────────────────────────────────────────────────────

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of keys to display; joined with `+` separator */
  keys?: string[];
  className?: string;
  children?: React.ReactNode;
}

const KbdKey = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { className?: string }>(
  ({ className, children, ...props }, ref) => (
    <kbd
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        'inline-flex items-center justify-center h-6 min-w-[1.5rem] px-1.5',
        'font-mono text-xs font-medium',
        'bg-background border border-border rounded shadow-[0_2px_0_0_hsl(var(--border))]',
        'text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  )
);
KbdKey.displayName = 'KbdKey';

const Kbd = React.forwardRef<HTMLSpanElement, KbdProps>(
  ({ keys, className, children, ...props }, ref) => {
    const items = keys ?? (children ? [children] : []);

    return (
      <span ref={ref} className={cn('inline-flex items-center gap-0.5', className)} {...props}>
        {items.map((key, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-[10px] text-muted-foreground/60 px-0.5">+</span>}
            <KbdKey>{key}</KbdKey>
          </React.Fragment>
        ))}
      </span>
    );
  }
);
Kbd.displayName = 'Kbd';

// ─── Link ─────────────────────────────────────────────────────────────────────

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Open in new tab with rel="noopener noreferrer" */
  external?: boolean;
  /** Underline behaviour — default `hover` */
  underline?: 'always' | 'hover' | 'none';
  /** Color variant */
  color?: 'primary' | 'muted' | 'danger' | 'foreground';
  className?: string;
  children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ external, underline = 'hover', color = 'primary', className, children, ...props }, ref) => (
    <a
      ref={ref}
      target={external ? '_blank' : props.target}
      rel={external ? 'noopener noreferrer' : props.rel}
      className={cn(
        'inline-flex items-center gap-0.5 transition-colors',
        color === 'primary'    && 'text-primary',
        color === 'muted'      && 'text-muted-foreground',
        color === 'danger'     && 'text-danger',
        color === 'foreground' && 'text-foreground',
        underline === 'always' && 'underline underline-offset-2',
        underline === 'hover'  && 'hover:underline underline-offset-2',
        underline === 'none'   && 'no-underline',
        className,
      )}
      {...props}
    >
      {children}
      {external && <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />}
    </a>
  )
);
Link.displayName = 'Link';

// ─── Mark ─────────────────────────────────────────────────────────────────────

const markVariants = tv({
  base: 'rounded px-0.5 py-px font-medium',
  variants: {
    variant: {
      default: 'bg-warning/25 text-warning-foreground',
      primary: 'bg-primary/15 text-primary',
      success: 'bg-success/15 text-success',
      warning: 'bg-warning/25 text-warning-foreground',
      danger:  'bg-danger/15 text-danger',
    },
  },
  defaultVariants: { variant: 'default' },
});

export interface MarkProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof markVariants> {
  className?: string;
  children?: React.ReactNode;
}

const Mark = React.forwardRef<HTMLElement, MarkProps>(
  ({ variant, className, children, ...props }, ref) => (
    <mark
      ref={ref as React.Ref<HTMLElement>}
      className={markVariants({ variant, className })}
      {...props}
    >
      {children}
    </mark>
  )
);
Mark.displayName = 'Mark';

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  Text,
  Heading,
  Paragraph,
  Lead,
  Blockquote,
  Code,
  Kbd,
  KbdKey,
  Link,
  Mark,
  textVariants,
  markVariants,
};
