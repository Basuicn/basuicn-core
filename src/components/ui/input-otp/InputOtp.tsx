import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { useInputOTP, getSeparatorPositions } from './useInputOTP';

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
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  inputMode?: InputMode;
  pattern?: RegExp;
  mask?: string | boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  description?: string;
  autoFocus?: boolean;
  separatorAfter?: number[] | number;
  separator?: SeparatorType;
  autoSubmit?: boolean;
  slotClassName?: string;
  successOnComplete?: boolean;
  placeholder?: string;
}

// ─── Separator Renderer ─────────────────────────────────────────────────────

function renderSeparatorContent(separator: SeparatorType) {
  if (separator === 'dash') return <span>&ndash;</span>;
  if (separator === 'dot') return <span>&bull;</span>;
  if (separator === 'space') return <span>&nbsp;&nbsp;</span>;
  return separator;
}

// ─── Display Char ───────────────────────────────────────────────────────────

function getDisplayChar(
  char: string,
  index: number,
  mask: string | boolean | undefined,
  placeholder: string | undefined,
) {
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
    const rootId = React.useId();
    const slots = inputOTPVariants({ variant, size, shape });
    const separatorPositions = getSeparatorPositions(separatorAfter, length);

    const {
      chars,
      isComplete,
      focusedIndex,
      setFocusedIndex,
      inputRefs,
      focusSlot,
      handleInput,
      handleKeyDown,
      handlePaste,
    } = useInputOTP({
      length,
      controlledValue,
      defaultValue,
      onChange,
      onComplete,
      inputMode,
      pattern: customPattern,
      autoFocus,
      autoSubmit,
    });

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
                  <div
                    className="flex items-center justify-center w-full h-full cursor-text"
                    onClick={() => !disabled && focusSlot(i)}
                  >
                    {getDisplayChar(chars[i], i, mask, placeholder)}
                  </div>
                  {isFocused && !isFilled && !disabled && (
                    <div className={slots.caret()}>
                      <div className={slots.caretBlink()} />
                    </div>
                  )}
                </div>

                {separatorPositions.has(i) && (
                  <div className={slots.separator()} aria-hidden="true">
                    {renderSeparatorContent(separator)}
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
