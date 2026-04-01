import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const [isDark, setIsDark] = React.useState(
        () => document.documentElement.classList.contains('dark')
    );

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

        // Fallback cho browser chưa hỗ trợ View Transitions API
        if (!('startViewTransition' in document)) {
            applyTheme(nextDark);
            return;
        }

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // Sử dụng View Transitions API để tạo hiệu ứng ripple lan toả
        const transition = (document as any).startViewTransition(() => {
            applyTheme(nextDark);
        });

        transition.ready.then(() => {
            document.documentElement.animate(
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
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95"
        >
            <Sun
                className={`h-[1.1rem] w-[1.1rem] absolute transition-all duration-300 ${
                    isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
                }`}
            />
            <Moon
                className={`h-[1.1rem] w-[1.1rem] absolute transition-all duration-300 ${
                    isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                }`}
            />
        </button>
    );
}
