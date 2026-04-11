import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders with progressbar role', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('reflects value via aria-valuenow', () => {
    render(<Progress value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders label above the bar', () => {
    render(<Progress value={30} label="Uploading" />);
    expect(screen.getByText('Uploading')).toBeInTheDocument();
  });

  it('shows percentage when labelPosition is outside', () => {
    render(<Progress value={60} labelPosition="outside" />);
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('shows percentage inside when labelPosition is inside and value > 5', () => {
    render(<Progress value={50} labelPosition="inside" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('does not show percentage inside when value is 0', () => {
    const { queryByText } = render(<Progress value={0} labelPosition="inside" />);
    expect(queryByText('0%')).not.toBeInTheDocument();
  });
});
