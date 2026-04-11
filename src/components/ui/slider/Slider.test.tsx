import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders thumb with slider role', () => {
    render(<Slider aria-label="Volume" defaultValue={50} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('reflects default value via aria-valuenow', () => {
    render(<Slider aria-label="Volume" defaultValue={40} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
  });

  it('shows tooltip value when showTooltip is true', () => {
    render(<Slider aria-label="Volume" defaultValue={30} showTooltip />);
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('renders multiple thumbs for range values', () => {
    render(<Slider aria-label="Range" defaultValue={[20, 80]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Slider aria-label="Volume" defaultValue={50} disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
