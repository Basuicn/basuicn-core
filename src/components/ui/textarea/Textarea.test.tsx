import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from './Textarea';
import React from 'react';

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Type your message" />);
    const textarea = screen.getByPlaceholderText(/type your message/i);
    expect(textarea).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('renders label and description correctly', () => {
    render(
      <Textarea 
        label="Message" 
        description="Max 500 characters" 
        id="textarea-1"
      />
    );
    
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('displays error message and applies error styles', () => {
    const { container } = render(<Textarea error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    
    const textarea = container.querySelector('textarea');
    expect(textarea?.className).toContain('border-danger');
  });
});
