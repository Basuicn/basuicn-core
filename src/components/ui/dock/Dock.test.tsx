import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Dock, DockIcon, DockSeparator } from './Dock';

describe('Dock', () => {
  it('renders compound icons as buttons within a toolbar', () => {
    render(
      <Dock>
        <DockIcon label="Home">H</DockIcon>
        <DockIcon label="Settings">S</DockIcon>
      </Dock>
    );

    expect(screen.getByRole('toolbar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('uses label as the accessible name', () => {
    render(
      <Dock>
        <DockIcon label="Search">icon</DockIcon>
      </Dock>
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('fires onClick when an icon is activated', async () => {
    const onClick = vi.fn();
    render(
      <Dock>
        <DockIcon label="Mail" onClick={onClick}>
          M
        </DockIcon>
      </Dock>
    );
    await userEvent.click(screen.getByRole('button', { name: /mail/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a separator with the correct orientation', () => {
    render(
      <Dock orientation="vertical">
        <DockIcon label="A">A</DockIcon>
        <DockSeparator />
        <DockIcon label="B">B</DockIcon>
      </Dock>
    );
    const sep = screen.getByRole('separator');
    expect(sep).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('reflects orientation on the toolbar', () => {
    render(
      <Dock orientation="vertical">
        <DockIcon label="A">A</DockIcon>
      </Dock>
    );
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders the prop-based items API equivalently to children', () => {
    render(
      <Dock
        items={[
          { icon: <span>H</span>, label: 'Home' },
          { icon: <span>S</span>, label: 'Settings' },
        ]}
      />
    );
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('throws when a sub-component is used outside Dock', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<DockIcon label="x">x</DockIcon>)).toThrow(/within <Dock>/);
    spy.mockRestore();
  });
});
