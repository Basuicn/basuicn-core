import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
} from './Sheet';

describe('Sheet', () => {
  it('renders the trigger element', () => {
    render(
      <Sheet>
        <SheetTrigger render={<button>Open Settings</button>} />
      </Sheet>
    );
    expect(screen.getByText('Open Settings')).toBeInTheDocument();
  });

  it('shows title when open', () => {
    render(
      <Sheet open={true}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          <SheetBody><p>Content</p></SheetBody>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('shows description when open', () => {
    render(
      <Sheet open={true}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Sheet description here</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText('Sheet description here')).toBeInTheDocument();
  });

  it('renders body content when open', () => {
    render(
      <Sheet open={true}>
        <SheetContent>
          <SheetBody>
            <p>Body content</p>
          </SheetBody>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders footer content when open', () => {
    render(
      <Sheet open={true}>
        <SheetContent>
          <SheetFooter>
            <button>Save</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
