import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from '../radio-group/RadioGroup';

describe('Radio', () => {
  it('renders with radio role', () => {
    render(
      <RadioGroup>
        <Radio value="a" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('marks as aria-disabled when disabled prop is set', () => {
    render(
      <RadioGroup>
        <Radio value="a" disabled />
      </RadioGroup>
    );
    expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true');
  });

  it('is checked when value matches group value', () => {
    render(
      <RadioGroup value="a">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
  });
});
