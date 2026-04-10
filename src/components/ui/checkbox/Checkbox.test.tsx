import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  it('renders with label', () => {
    render(<Checkbox label="Checkbox" />);
    expect(screen.getByText('Checkbox')).toBeInTheDocument();
  });
  it('disabled', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
  });
  it('checked', () => {
    render(<Checkbox checked />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });
  it('indeterminate', () => {
    render(<Checkbox indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-indeterminate');
  });
});