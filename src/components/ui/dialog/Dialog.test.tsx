import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './Dialog';

describe('Dialog', () => {
  it('renders trigger', () => {
    render(
      <Dialog>
        <DialogTrigger render={<button>Open</button>} />
      </Dialog>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('shows title when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <p>Body</p>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
  });

  it('shows description when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
          <p>Body</p>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <p>Dialog body content</p>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Dialog body content')).toBeInTheDocument();
  });
});
