import { Disclosure } from '@components/ui/disclosure/Disclosure';
import { useTheme } from '@lib/theme/ThemeProvider';

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Disclosure items={[
        {
          id: '1',
          title: 'Theme',
          content: (
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-0.5">Giao diện</p>
              {themes.map(theme => (
                <button
                  key={theme.name}
                  onClick={() => setTheme(theme.name)}
                  className={`
              flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all outline-none
              ${currentTheme.name === theme.name
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
            `}
                >
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white shadow shrink-0"
                    style={{ background: theme.colors.primary}}
                  />
                  {theme.label}
                </button>
              ))}
            </div>
          )
        }
      ]} />

    </div>


  );
}
