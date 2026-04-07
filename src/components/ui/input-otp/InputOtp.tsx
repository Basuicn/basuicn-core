import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

// ─── Variants ────────────────────────────────────────────────────────────────

const inputOTPVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    slot: [
      'relative flex items-center justify-center',
      'border border-border bg-background text-foreground font-semibold',
      'transition-all duration-200 outline-none',
      'select-none',
    ].join(' '),
    separator: 'flex items-center justify-center text-muted-foreground shrink-0',
    caret: 'absolute inset-0 flex items-center justify-center pointer-events-none',
    caretBlink: 'w-px bg-foreground animate-blink',
  },
  variants: {
    variant: {
      outline: {
        slot: 'rounded-md focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
      },
      filled: {
        slot: 'rounded-md bg-muted border-transparent focus-within:bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
      },
      underline: {
        slot: 'border-0 border-b-2 border-b-border rounded-none bg-transparent focus-within:border-b-primary',
      },
      glass: {
        slot: 'rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 dark:border-white/10 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 shadow-sm',
      },
    },
    size: {
      sm: {
        slot: 'h-9 w-9 text-sm',
        separator: 'text-lg px-0.5',
        caretBlink: 'h-4',
      },
      md: {
        slot: 'h-12 w-12 text-lg',
        separator: 'text-xl px-1',
        caretBlink: 'h-5',
      },
      lg: {
        slot: 'h-14 w-14 text-2xl',
        separator: 'text-2xl px-1.5',
        caretBlink: 'h-6',
      },
    },
    shape: {
      square: { slot: '' },
      rounded: { slot: '' },
      circle: { slot: '' },
    },
  },
  compoundVariants: [
    { shape: 'rounded', variant: 'outline', className: { slot: 'rounded-xl' } },
    { shape: 'rounded', variant: 'filled', className: { slot: 'rounded-xl' } },
    { shape: 'rounded', variant: 'glass', className: { slot: 'rounded-2xl' } },
    { shape: 'circle', variant: 'outline', className: { slot: 'rounded-full' } },
    { shape: 'circle', variant: 'filled', className: { slot: 'rounded-full' } },
    { shape: 'circle', variant: 'glass', className: { slot: 'rounded-full' } },
  ],
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    shape: 'square',
  },
});

// ─── Types ───────────────────────────────────────────────────────────────────

type InputMode = 'numeric' | 'alphanumeric' | 'alpha' | 'custom';
type SeparatorType = 'dash' | 'dot' | 'space' | React.ReactNode;

export interface InputOTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'inputMode'>,
    VariantProps<typeof inputOTPVariants> {
  /** Total number of OTP slots */
  length?: number;
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Fired on every value change */
  onChange?: (value: string) => void;
  /** Fired when all slots are filled */
  onComplete?: (value: string) => void;
  /** What characters are allowed */
  inputMode?: InputMode;
  /** Custom regex pattern when inputMode='custom' */
  pattern?: RegExp;
  /** Mask character for entered values (e.g. '*' for password-style) */
  mask?: string | boolean;
  /** Disable the entire input */
  disabled?: boolean;
  /** Show error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Label */
  label?: string;
  /** Description */
  description?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Separator config: insert separator after these indices, or every N slots */
  separatorAfter?: number[] | number;
  /** Separator visual */
  separator?: SeparatorType;
  /** Auto-submit on complete */
  autoSubmit?: boolean;
  /** Slot className override */
  slotClassName?: string;
  /** Render filled slots with success style */
  successOnComplete?: boolean;
  /** Placeholder per slot */
  placeholder?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const INPUT_PATTERNS: Record<Exclude<InputMode, 'custom'>, RegExp> = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alpha: /^[a-zA-Z]$/,
};

function getPattern(mode: InputMode, custom?: RegExp): RegExp {
  if (mode === 'custom' && custom) return custom;
  return INPUT_PATTERNS[mode as Exclude<InputMode, 'custom'>] ?? INPUT_PATTERNS.numeric;
}

function getSeparatorPositions(config: number[] | number | undefined, length: number): Set<number> {
  if (!config) return new Set();
  if (Array.isArray(config)) return new Set(config);
  // every N slots
  const positions = new Set<number>();
  for (let i = config - 1; i < length - 1; i += config) {
    positions.add(i);
  }
  return positions;
}

// ─── Component ───────────────────────────────────────────────────────────────

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      length = 6,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onComplete,
      inputMode = 'numeric',
      pattern: customPattern,
      mask,
      disabled = false,
      error = false,
      errorMessage,
      label,
      description,
      autoFocus = false,
      separatorAfter,
      separator = 'dash',
      autoSubmit = false,
      slotClassName,
      successOnComplete = false,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const rootId = React.useId();

    const pat = getPattern(inputMode, customPattern);
    const separatorPositions = getSeparatorPositions(separatorAfter, length);
    const slots = inputOTPVariants({ variant, size, shape });

    const chars = React.useMemo(() => {
      const arr = currentValue.split('');
      while (arr.length < length) arr.push('');
      return arr.slice(0, length);
    }, [currentValue, length]);

    const isComplete = chars.every((c) => c !== '');

    // ─── Value helpers ─────────────────────────────────────────────────

    const updateValue = React.useCallback(
      (newChars: string[]) => {
        const val = newChars.join('');
        if (!isControlled) setInternalValue(val);
        onChange?.(val);
        if (val.length === length && newChars.every((c) => c !== '')) {
          onComplete?.(val);
        }
      },
      [isControlled, onChange, onComplete, length],
    );

    const focusSlot = React.useCallback((index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      inputRefs.current[clamped]?.focus();
    }, [length]);

    // ─── Handlers ──────────────────────────────────────────────────────

    const handleInput = React.useCallback(
      (index: number, char: string) => {
        if (!pat.test(char)) return;
        const next = [...chars];
        next[index] = char;
        updateValue(next);
        if (index < length - 1) {
          focusSlot(index + 1);
        }
      },
      [chars, pat, updateValue, length, focusSlot],
    );

    const handleKeyDown = React.useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'Backspace': {
            e.preventDefault();
            const next = [...chars];
            if (chars[index] !== '') {
              next[index] = '';
              updateValue(next);
            } else if (index > 0) {
              next[index - 1] = '';
              updateValue(next);
              focusSlot(index - 1);
            }
            break;
          }
          case 'Delete': {
            e.preventDefault();
            const next = [...chars];
            next[index] = '';
            updateValue(next);
            break;
          }
          case 'ArrowLeft':
            e.preventDefault();
            if (index > 0) focusSlot(index - 1);
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (index < length - 1) focusSlot(index + 1);
            break;
          case 'Home':
            e.preventDefault();
            focusSlot(0);
            break;
          case 'End':
            e.preventDefault();
            focusSlot(length - 1);
            break;
        }
      },
      [chars, updateValue, focusSlot, length],
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text/plain').trim();
        const next = [...chars];
        let cursor = focusedIndex ?? 0;
        for (const ch of pasted) {
          if (cursor >= length) break;
          if (pat.test(ch)) {
            next[cursor] = ch;
            cursor++;
          }
        }
        updateValue(next);
        focusSlot(Math.min(cursor, length - 1));
      },
      [chars, focusedIndex, length, pat, updateValue, focusSlot],
    );

    // ─── Auto focus ────────────────────────────────────────────────────

    React.useEffect(() => {
      if (autoFocus) {
        const firstEmpty = chars.findIndex((c) => c === '');
        focusSlot(firstEmpty === -1 ? 0 : firstEmpty);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ─── Auto submit ───────────────────────────────────────────────────

    React.useEffect(() => {
      if (autoSubmit && isComplete) {
        const form = inputRefs.current[0]?.closest('form');
        if (form) {
          form.requestSubmit();
        }
      }
    }, [autoSubmit, isComplete]);

    // ─── Render separator ──────────────────────────────────────────────

    const renderSeparator = () => {
      if (separator === 'dash') return <span>&ndash;</span>;
      if (separator === 'dot') return <span>&bull;</span>;
      if (separator === 'space') return <span>&nbsp;&nbsp;</span>;
      return separator;
    };

    // ─── Render display char ───────────────────────────────────────────

    const getDisplayChar = (char: string, index: number) => {
      if (char === '') {
        if (placeholder && placeholder[index]) {
          return <span className="text-muted-foreground/50 font-normal">{placeholder[index]}</span>;
        }
        return null;
      }
      if (mask) {
        const maskChar = typeof mask === 'string' ? mask : '\u2022';
        return <span>{maskChar}</span>;
      }
      return <span>{char}</span>;
    };

    // ─── Render ────────────────────────────────────────────────────────

    return (
      <div ref={ref} className="flex flex-col gap-1.5" {...props}>
        {label && (
          <label htmlFor={`${rootId}-0`} className="text-sm font-medium text-foreground leading-none">
            {label}
          </label>
        )}

        <div
          className={cn(slots.root(), className)}
          role="group"
          aria-label={label || 'OTP Input'}
          aria-describedby={description ? `${rootId}-desc` : errorMessage ? `${rootId}-err` : undefined}
        >
          {Array.from({ length }).map((_, i) => {
            const isFocused = focusedIndex === i;
            const isFilled = chars[i] !== '';
            const showSuccess = successOnComplete && isComplete;
            const showError = error && !showSuccess;

            return (
              <React.Fragment key={i}>
                <div
                  className={cn(
                    slots.slot(),
                    isFocused && !showError && 'border-primary ring-2 ring-primary/20',
                    showError && 'border-danger',
                    showSuccess && 'border-success text-success',
                    disabled && 'opacity-50 cursor-not-allowed',
                    slotClassName,
                  )}
                >
                  <input
                    ref={(el) => { inputRefs.current[i] = el; }}
                    id={i === 0 ? `${rootId}-0` : undefined}
                    type="text"
                    inputMode={inputMode === 'numeric' ? 'numeric' : 'text'}
                    autoComplete={i === 0 ? 'one-time-code' : 'off'}
                    aria-label={`Digit ${i + 1} of ${length}`}
                    aria-invalid={error || undefined}
                    maxLength={1}
                    value=""
                    disabled={disabled}
                    className="sr-only"
                    onFocus={() => setFocusedIndex(i)}
                    onBlur={() => setFocusedIndex(null)}
                    onChange={(e) => {
                      const char = e.target.value;
                      if (char) handleInput(i, char);
                    }}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                  />
                  {/* Display */}
                  <div
                    className="flex items-center justify-center w-full h-full cursor-text"
                    onClick={() => !disabled && focusSlot(i)}
                  >
                    {getDisplayChar(chars[i], i)}
                  </div>
                  {/* Caret */}
                  {isFocused && !isFilled && !disabled && (
                    <div className={slots.caret()}>
                      <div className={slots.caretBlink()} />
                    </div>
                  )}
                </div>

                {/* Separator */}
                {separatorPositions.has(i) && (
                  <div className={slots.separator()} aria-hidden="true">
                    {renderSeparator()}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {description && !error && !errorMessage && (
          <p id={`${rootId}-desc`} className="text-[0.8rem] text-muted-foreground">{description}</p>
        )}
        {(error || errorMessage) && (
          <p id={`${rootId}-err`} className="text-[0.8rem] font-medium text-danger">{errorMessage || 'Invalid code'}</p>
        )}
      </div>
    );
  },
);

InputOTP.displayName = 'InputOTP';

export { InputOTP, inputOTPVariants };
