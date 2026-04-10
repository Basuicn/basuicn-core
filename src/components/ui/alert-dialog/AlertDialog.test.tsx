import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogClose,
} from './AlertDialog';

describe('AlertDialog', () => {
  it('renders the trigger button', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger render={<button>Delete</button>} />
      </AlertDialog>
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows title and description when open', () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
  });

  it('renders cancel and proceed buttons in footer', () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete item?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<button>Cancel</button>} />
            <button>Delete</button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders children inside the content', () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Title</AlertDialogTitle>
          </AlertDialogHeader>
          <p>Dialog body here</p>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(screen.getByText('Dialog body here')).toBeInTheDocument();
  });
});
