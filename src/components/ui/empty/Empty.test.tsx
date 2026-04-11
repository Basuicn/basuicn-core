import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './Empty';

describe('EmptyState', () => {
  it('renders default preset title', () => {
    render(<EmptyState />);
    expect(screen.getByText('Không có gì ở đây')).toBeInTheDocument();
  });

  it('renders default preset description', () => {
    render(<EmptyState />);
    expect(screen.getByText('Nội dung sẽ xuất hiện sau khi bạn thêm dữ liệu mới.')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<EmptyState title="Nothing found" />);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders custom description', () => {
    render(<EmptyState description="Try a different search" />);
    expect(screen.getByText('Try a different search')).toBeInTheDocument();
  });

  it('renders action element when provided', () => {
    render(<EmptyState action={<button>Add item</button>} />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('renders with users preset', () => {
    render(<EmptyState preset="users" />);
    expect(screen.getByText('Chưa có người dùng')).toBeInTheDocument();
  });

  it('renders with search preset', () => {
    render(<EmptyState preset="search" />);
    expect(screen.getByText('Không tìm thấy kết quả')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(<EmptyState><span>Extra content</span></EmptyState>);
    expect(screen.getByText('Extra content')).toBeInTheDocument();
  });
});
