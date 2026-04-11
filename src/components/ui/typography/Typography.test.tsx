import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text, Heading, Paragraph, Lead, Blockquote, Code, Link, Mark, Kbd } from './Typography';

describe('Text', () => {
  it('renders text content', () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders as custom element with as prop', () => {
    const { container } = render(<Text as="p">Paragraph</Text>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('applies bold class when strong is true', () => {
    const { container } = render(<Text strong>Bold text</Text>);
    expect(container.firstChild).toHaveClass('font-bold');
  });

  it('applies italic class when italic is true', () => {
    const { container } = render(<Text italic>Italic text</Text>);
    expect(container.firstChild).toHaveClass('italic');
  });

  it('applies underline class', () => {
    const { container } = render(<Text underline>Underlined</Text>);
    expect(container.firstChild).toHaveClass('underline');
  });
});

describe('Heading', () => {
  it('renders h2 by default', () => {
    const { container } = render(<Heading>Title</Heading>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('renders correct heading level', () => {
    const { container } = render(<Heading level={3}>Section</Heading>);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('renders h1 when level is 1', () => {
    const { container } = render(<Heading level={1}>Main Title</Heading>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });
});

describe('Paragraph', () => {
  it('renders text in a p element', () => {
    const { container } = render(<Paragraph>Some paragraph text</Paragraph>);
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(screen.getByText('Some paragraph text')).toBeInTheDocument();
  });
});

describe('Lead', () => {
  it('renders lead text', () => {
    render(<Lead>Introduction text</Lead>);
    expect(screen.getByText('Introduction text')).toBeInTheDocument();
  });
});

describe('Blockquote', () => {
  it('renders quote text', () => {
    render(<Blockquote>Quote content</Blockquote>);
    expect(screen.getByText('Quote content')).toBeInTheDocument();
  });

  it('renders citation when cite is provided', () => {
    render(<Blockquote cite="Famous Author">Quote</Blockquote>);
    expect(screen.getByText('— Famous Author')).toBeInTheDocument();
  });
});

describe('Code', () => {
  it('renders code content', () => {
    render(<Code>npm install</Code>);
    expect(screen.getByText('npm install')).toBeInTheDocument();
  });

  it('renders as code element', () => {
    const { container } = render(<Code>const x = 1</Code>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });
});

describe('Link', () => {
  it('renders anchor with href', () => {
    render(<Link href="https://example.com">Visit</Link>);
    const link = screen.getByRole('link', { name: /visit/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('opens in new tab when external is true', () => {
    render(<Link href="https://example.com" external>External link</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('sets rel=noopener when external', () => {
    render(<Link href="https://example.com" external>Link</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

describe('Mark', () => {
  it('renders highlighted text', () => {
    render(<Mark>highlighted</Mark>);
    expect(screen.getByText('highlighted')).toBeInTheDocument();
  });

  it('renders as mark element', () => {
    const { container } = render(<Mark>text</Mark>);
    expect(container.querySelector('mark')).toBeInTheDocument();
  });
});

describe('Kbd', () => {
  it('renders keyboard keys', () => {
    render(<Kbd keys={['Ctrl', 'K']} />);
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('renders children as single key', () => {
    render(<Kbd>Enter</Kbd>);
    expect(screen.getByText('Enter')).toBeInTheDocument();
  });
});
