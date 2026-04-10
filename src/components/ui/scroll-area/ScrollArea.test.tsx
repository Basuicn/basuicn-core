import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScrollArea, ScrollBar } from './ScrollArea';

describe('ScrollArea', () => {
  it('renders children correctly', () => {
    render(
      <ScrollArea>
        <p>Scrollable content</p>
      </ScrollArea>
    );
    expect(screen.getByText('Scrollable content')).toBeInTheDocument();
  });

  it('has region role with aria-label', () => {
    render(<ScrollArea aria-label="Main content">Content</ScrollArea>);
    expect(screen.getByRole('region', { name: 'Main content' })).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <ScrollArea>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ScrollArea>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
});

describe('ScrollBar', () => {
  it('renders correctly', () => {
    const { container } = render(<ScrollBar />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
