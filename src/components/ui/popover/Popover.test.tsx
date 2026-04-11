import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './Popover';

describe('Popover', () => {
  it('renders the trigger button', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('shows content when forced open', () => {
    render(
      <Popover open={true}>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('renders close button inside content', () => {
    render(
      <Popover open={true}>
        <PopoverContent>
          <PopoverClose render={<button>Close</button>} />
          <p>Content here</p>
        </PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>
          <button>Toggle</button>
        </PopoverTrigger>
        <PopoverContent>Revealed content</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Toggle'));
    expect(screen.getByText('Revealed content')).toBeInTheDocument();
  });
});
