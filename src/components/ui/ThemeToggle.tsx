import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ViewTransition {
    ready: Promise<void>;
}

export function ThemeToggle() {
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') {
            setIsDark(true);
        } else if (stored === 'light') {
            setIsDark(false);
        } else {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        setIsDark(dark);
    };

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const nextDark = !isDark;
        const x = e.clientX;
        const y = e.clientY;

        const doc = document as Document & {
            startViewTransition?: (callback: () => void) => ViewTransition;
        };

        // Fallback cho browser chưa hỗ trợ View Transitions API
        if (!doc.startViewTransition) {
            applyTheme(nextDark);
            return;
        }

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const root = document.documentElement;

        if (nextDark) {
            // Set CSS vars trước khi startViewTransition để keyframe đọc được
            root.style.setProperty('--vt-x', `${x}px`);
            root.style.setProperty('--vt-y', `${y}px`);
            root.style.setProperty('--vt-r', `${endRadius}px`);
            root.classList.add('theme-to-dark');
        }

        const transition = doc.startViewTransition(() => {
            applyTheme(nextDark);
        });

        // Tối → Sáng: JS animate vẫn dùng được vì new snapshot luôn chính xác
        if (!nextDark) {
            transition.ready.then(() => {
                root.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${endRadius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration: 400,
                        easing: 'ease-out',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
            });
        }

        transition.finished.then(() => {
            root.classList.remove('theme-to-dark');
            root.style.removeProperty('--vt-x');
            root.style.removeProperty('--vt-y');
            root.style.removeProperty('--vt-r');
        });
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="relative h-11 w-11 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95"
        >
            <Sun
                aria-hidden="true"
                className={`h-[1.1rem] w-[1.1rem] absolute transition-all duration-300 ${
                    isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
                }`}
            />
            <Moon
                aria-hidden="true"
                className={`h-[1.1rem] w-[1.1rem] absolute transition-all duration-300 ${
                    isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                }`}
            />
        </button>
    );
}
