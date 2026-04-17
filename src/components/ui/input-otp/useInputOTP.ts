import * as React from 'react';

type InputMode = 'numeric' | 'alphanumeric' | 'alpha' | 'custom';

const INPUT_PATTERNS: Record<Exclude<InputMode, 'custom'>, RegExp> = {
    numeric: /^[0-9]$/,
    alphanumeric: /^[a-zA-Z0-9]$/,
    alpha: /^[a-zA-Z]$/,
};

function getPattern(mode: InputMode, custom?: RegExp): RegExp {
    if (mode === 'custom' && custom) return custom;
    return INPUT_PATTERNS[mode as Exclude<InputMode, 'custom'>] ?? INPUT_PATTERNS.numeric;
}

export function getSeparatorPositions(config: number[] | number | undefined, length: number): Set<number> {
    if (!config) return new Set();
    if (Array.isArray(config)) return new Set(config);
    const positions = new Set<number>();
    for (let i = config - 1; i < length - 1; i += config) {
        positions.add(i);
    }
    return positions;
}

export interface UseInputOTPOptions {
    length: number;
    controlledValue?: string;
    defaultValue: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    inputMode: InputMode;
    pattern?: RegExp;
    autoFocus: boolean;
    autoSubmit: boolean;
}

export function useInputOTP({
    length,
    controlledValue,
    defaultValue,
    onChange,
    onComplete,
    inputMode,
    pattern: customPattern,
    autoFocus,
    autoSubmit,
}: UseInputOTPOptions) {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const pat = getPattern(inputMode, customPattern);

    const chars = React.useMemo(() => {
        const arr = currentValue.split('');
        while (arr.length < length) arr.push('');
        return arr.slice(0, length);
    }, [currentValue, length]);

    const isComplete = chars.every((c) => c !== '');

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

    // Auto focus
    React.useEffect(() => {
        if (autoFocus) {
            const firstEmpty = chars.findIndex((c) => c === '');
            focusSlot(firstEmpty === -1 ? 0 : firstEmpty);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto submit
    React.useEffect(() => {
        if (autoSubmit && isComplete) {
            const form = inputRefs.current[0]?.closest('form');
            if (form) {
                form.requestSubmit();
            }
        }
    }, [autoSubmit, isComplete]);

    return {
        chars,
        isComplete,
        focusedIndex,
        setFocusedIndex,
        inputRefs,
        focusSlot,
        handleInput,
        handleKeyDown,
        handlePaste,
    };
}
