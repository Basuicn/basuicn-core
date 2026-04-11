import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Collapsible } from './Collapsible';

describe('Collapsible', () => {
  it('renders trigger text', () => {
    render(<Collapsible trigger="Click to expand">Hidden content</Collapsible>);
    expect(screen.getByText('Click to expand')).toBeInTheDocument();
  });

  it('shows content when defaultOpen is true', () => {
    render(
      <Collapsible trigger="Section" defaultOpen={true}>
        Visible content
      </Collapsible>
    );
    expect(screen.getByText('Visible content')).toBeVisible();
  });

  it('hides content by default (closed)', () => {
    render(
      <Collapsible trigger="Section">
        Hidden content
      </Collapsible>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('reveals content after clicking trigger', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible trigger="Toggle Section">
        Panel content
      </Collapsible>
    );
    await user.click(screen.getByRole('button', { name: /toggle section/i }));
    expect(screen.getByText('Panel content')).toBeVisible();
  });
});
