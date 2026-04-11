import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';

describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip content when forced open', () => {
    render(
      <TooltipProvider>
        <Tooltip open={true}>
          <TooltipTrigger>
            <button>Button</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip message</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByText('Tooltip message')).toBeInTheDocument();
  });

  it('tooltip content has tooltip role', () => {
    render(
      <TooltipProvider>
        <Tooltip open={true}>
          <TooltipTrigger>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Info</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
