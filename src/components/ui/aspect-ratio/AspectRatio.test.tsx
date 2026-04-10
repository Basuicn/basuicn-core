import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  it('renders children', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="photo.jpg" alt="landscape" />
      </AspectRatio>
    );
    expect(screen.getByAltText('landscape')).toBeInTheDocument();
  });

  it('applies padding-bottom based on ratio (16:9)', () => {
    const { container } = render(<AspectRatio ratio={16 / 9}>content</AspectRatio>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.paddingBottom).toBe('56.25%');
  });

  it('applies padding-bottom for 4:3 ratio', () => {
    const { container } = render(<AspectRatio ratio={4 / 3}>content</AspectRatio>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.paddingBottom).toBe('75%');
  });

  it('defaults to 1:1 ratio (100% padding)', () => {
    const { container } = render(<AspectRatio>content</AspectRatio>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.paddingBottom).toBe('100%');
  });

  it('positions children absolutely inside', () => {
    const { container } = render(
      <AspectRatio><span>inner</span></AspectRatio>
    );
    const inner = container.querySelector('div.absolute');
    expect(inner).toBeInTheDocument();
  });
});
