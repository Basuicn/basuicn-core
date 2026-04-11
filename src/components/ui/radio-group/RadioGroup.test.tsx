import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './RadioGroup';
import { Radio } from '../radio/Radio';

describe('RadioGroup', () => {
  it('renders multiple radio buttons', () => {
    render(
      <RadioGroup>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
        <Radio value="c" label="C" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('applies vertical orientation by default', () => {
    const { container } = render(
      <RadioGroup>
        <Radio value="a" label="A" />
      </RadioGroup>
    );
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies horizontal orientation when specified', () => {
    const { container } = render(
      <RadioGroup orientation="horizontal">
        <Radio value="a" label="A" />
      </RadioGroup>
    );
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('calls onValueChange when a radio is selected', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <Radio value="x" label="X" />
        <Radio value="y" label="Y" />
      </RadioGroup>
    );
    await user.click(screen.getByText('X'));
    expect(onValueChange).toHaveBeenCalledWith('x', expect.anything());
  });
});
