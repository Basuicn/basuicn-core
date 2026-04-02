import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders loading spinner when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });
    
    // Nút phải bị disable
    expect(button).toBeDisabled();
    
    // Spinner (có role="status") phải xuất hiện
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('renders correctly with different variants', () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('bg-danger');
  });
});
