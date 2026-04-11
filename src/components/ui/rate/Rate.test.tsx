import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Rate } from './Rate';

describe('Rate', () => {
  it('renders 5 stars by default', () => {
    render(<Rate />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('renders custom number of stars', () => {
    render(<Rate count={3} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('readonly stars are not disabled (just non-interactive via events)', () => {
    render(<Rate readonly />);
    for (const star of screen.getAllByRole('radio')) {
      expect(star).not.toBeDisabled();
    }
  });

  it('all stars have disabled attribute when disabled', () => {
    render(<Rate disabled />);
    for (const star of screen.getAllByRole('radio')) {
      expect(star).toBeDisabled();
    }
  });

  it('calls onChange when a star is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rate onChange={onChange} />);
    const stars = screen.getAllByRole('radio');
    await user.click(stars[2]); // click 3rd star
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('uses aria-label for accessibility', () => {
    render(<Rate count={3} />);
    const stars = screen.getAllByRole('radio');
    expect(stars[0]).toHaveAttribute('aria-label', '1 star');
    expect(stars[1]).toHaveAttribute('aria-label', '2 stars');
    expect(stars[2]).toHaveAttribute('aria-label', '3 stars');
  });
});
