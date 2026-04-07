export interface SandboxTemplate {
  id: string;
  label: string;
  description: string;
  icon: string;
  template: 'react' | 'react-ts';
  files: Record<string, string>;
  dependencies?: Record<string, string>;
}

export const SANDBOX_TEMPLATES: SandboxTemplate[] = [
  {
    id: 'react',
    label: 'React',
    description: 'React with JavaScript',
    icon: '\u269B\uFE0F',
    template: 'react',
    files: {
      '/App.js': `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>React Playground</h1>
      <p className="count">{count}</p>
      <div className="actions">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}
`,
      '/styles.css': `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
.app { max-width: 600px; margin: 40px auto; padding: 24px; text-align: center; }
h1 { font-size: 24px; margin-bottom: 16px; }
.count { font-size: 48px; font-weight: 700; color: #3b82f6; margin: 16px 0; }
.actions { display: flex; gap: 8px; justify-content: center; }
.actions button { width: 64px; padding: 8px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-size: 16px; transition: all 0.15s; }
.actions button:hover { background: #f1f5f9; border-color: #3b82f6; }
`,
    },
  },
  {
    id: 'react-ts',
    label: 'React + TypeScript',
    description: 'React with TypeScript strict mode',
    icon: '\uD83D\uDC8E',
    template: 'react-ts',
    files: {
      '/App.tsx': `import React, { useState } from 'react';
import './styles.css';

interface AppProps {
  title?: string;
}

const App: React.FC<AppProps> = ({ title = 'React + TypeScript' }) => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="app">
      <h1>{title}</h1>
      <p className="count">{count}</p>
      <div className="actions">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
};

export default App;
`,
      '/styles.css': `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
.app { max-width: 600px; margin: 40px auto; padding: 24px; text-align: center; }
h1 { font-size: 24px; margin-bottom: 16px; }
.count { font-size: 48px; font-weight: 700; color: #3b82f6; margin: 16px 0; }
.actions { display: flex; gap: 8px; justify-content: center; }
.actions button { width: 64px; padding: 8px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-size: 16px; transition: all 0.15s; }
.actions button:hover { background: #f1f5f9; border-color: #3b82f6; }
`,
    },
  },
  {
    id: 'component',
    label: 'Component Workshop',
    description: 'Build & test React components',
    icon: '\uD83E\uDDE9',
    template: 'react-ts',
    files: {
      '/App.tsx': `import React from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import './styles.css';

export default function App() {
  return (
    <div className="app">
      <h1>Component Workshop</h1>
      <div className="grid">
        <Card title="Button Variants">
          <div className="row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </Card>
        <Card title="Button Sizes">
          <div className="row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>
        <Card title="Your Component">
          <p style={{ color: '#64748b' }}>Create your own component in /components!</p>
        </Card>
      </div>
    </div>
  );
}
`,
      '/components/Button.tsx': `import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const styles: Record<string, React.CSSProperties> = {
  primary: { background: '#3b82f6', color: 'white', border: 'none' },
  secondary: { background: '#e2e8f0', color: '#334155', border: 'none' },
  outline: { background: 'transparent', color: '#3b82f6', border: '1.5px solid #3b82f6' },
  sm: { padding: '6px 12px', fontSize: 12 },
  md: { padding: '8px 16px', fontSize: 14 },
  lg: { padding: '12px 24px', fontSize: 16 },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}) => (
  <button
    style={{
      borderRadius: 8,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'opacity 0.15s',
      ...styles[variant],
      ...styles[size],
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
);
`,
      '/components/Card.tsx': `import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <div style={{
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: 20,
  }}>
    <h3 style={{ fontSize: 16, marginBottom: 12, color: '#334155' }}>{title}</h3>
    {children}
  </div>
);
`,
      '/styles.css': `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
.app { max-width: 800px; margin: 24px auto; padding: 20px; }
h1 { font-size: 22px; margin-bottom: 20px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
.row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
`,
    },
  },
  {
    id: 'hooks',
    label: 'Hooks Playground',
    description: 'Practice React Hooks patterns',
    icon: '\uD83E\uDE9D',
    template: 'react-ts',
    files: {
      '/App.tsx': `import React from 'react';
import { Counter } from './examples/Counter';
import { TodoList } from './examples/TodoList';
import { FetchData } from './examples/FetchData';
import './styles.css';

export default function App() {
  return (
    <div className="app">
      <h1>React Hooks Playground</h1>
      <section>
        <h2>useState + useCallback</h2>
        <Counter />
      </section>
      <section>
        <h2>useState + useRef</h2>
        <TodoList />
      </section>
      <section>
        <h2>useEffect + fetch</h2>
        <FetchData />
      </section>
    </div>
  );
}
`,
      '/examples/Counter.tsx': `import React, { useState, useCallback } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(0), []);

  return (
    <div className="card">
      <p className="count">{count}</p>
      <div className="row center">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};
`,
      '/examples/TodoList.tsx': `import React, { useState, useRef } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const text = inputRef.current?.value.trim();
    if (!text) return;
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
    inputRef.current!.value = '';
    inputRef.current!.focus();
  };

  const toggle = (id: number) =>
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );

  return (
    <div className="card">
      <div className="row" style={{ marginBottom: 12 }}>
        <input
          ref={inputRef}
          placeholder="Add todo..."
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          style={{
            flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0',
            borderRadius: 6, outline: 'none', fontSize: 14,
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {todos.map(t => (
        <div
          key={t.id}
          onClick={() => toggle(t.id)}
          style={{
            padding: '8px 0', borderBottom: '1px solid #f1f5f9',
            cursor: 'pointer', textDecoration: t.done ? 'line-through' : 'none',
            color: t.done ? '#94a3b8' : 'inherit',
          }}
        >
          {t.text}
        </div>
      ))}
      {todos.length === 0 && (
        <p style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', padding: 16 }}>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
};
`,
      '/examples/FetchData.tsx': `import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export const FetchData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setUsers(data.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="card">Loading...</div>;
  if (error) return <div className="card" style={{ color: '#ef4444' }}>Error: {error}</div>;

  return (
    <div className="card">
      {users.map(u => (
        <div key={u.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 0', borderBottom: '1px solid #f1f5f9',
        }}>
          <strong style={{ fontSize: 14 }}>{u.name}</strong>
          <span style={{ fontSize: 13, color: '#64748b' }}>{u.email}</span>
        </div>
      ))}
    </div>
  );
};
`,
      '/styles.css': `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
.app { max-width: 680px; margin: 20px auto; padding: 20px; }
h1 { font-size: 22px; margin-bottom: 20px; }
h2 { font-size: 12px; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
section { margin-bottom: 24px; }
.card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
.count { font-size: 48px; font-weight: 700; text-align: center; color: #3b82f6; }
.row { display: flex; gap: 8px; align-items: center; }
.center { justify-content: center; margin-top: 12px; }
button { padding: 8px 16px; border-radius: 6px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-size: 14px; transition: all 0.15s; }
button:hover { background: #f1f5f9; border-color: #3b82f6; }
`,
    },
  },
  {
    id: 'tailwind',
    label: 'React + Tailwind',
    description: 'React with Tailwind CSS via CDN',
    icon: '\uD83C\uDFA8',
    template: 'react',
    files: {
      '/public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React + Tailwind</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          React + Tailwind
        </h1>
        <p className="text-slate-500 mb-6">Edit App.js to get started</p>

        <div className="text-6xl font-bold text-blue-500 mb-6">{count}</div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setCount(c => c - 1)}
            className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-lg font-medium transition-colors"
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-6 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(c => c + 1)}
            className="w-12 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
`,
      '/index.js': `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
    },
  },
];
