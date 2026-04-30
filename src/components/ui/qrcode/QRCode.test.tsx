import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QRCode } from './QRCode';

vi.mock('qrcode.react', () => ({
  QRCodeSVG: ({ value, size }: { value: string; size: number }) => (
    <svg data-testid="qrcode-svg" data-value={value} data-size={String(size)} />
  ),
  QRCodeCanvas: ({ value, size }: { value: string; size: number }) => (
    <canvas data-testid="qrcode-canvas" data-value={value} data-size={String(size)} />
  ),
}));

describe('QRCode', () => {
  it('renders SVG by default', () => {
    render(<QRCode value="https://example.com" />);
    expect(screen.getByTestId('qrcode-svg')).toBeInTheDocument();
  });

  it('does not render Canvas when using default renderer', () => {
    render(<QRCode value="https://example.com" />);
    expect(screen.queryByTestId('qrcode-canvas')).not.toBeInTheDocument();
  });

  it('renders Canvas when renderer is canvas', () => {
    render(<QRCode value="https://example.com" renderer="canvas" />);
    expect(screen.getByTestId('qrcode-canvas')).toBeInTheDocument();
  });

  it('does not render SVG when renderer is canvas', () => {
    render(<QRCode value="https://example.com" renderer="canvas" />);
    expect(screen.queryByTestId('qrcode-svg')).not.toBeInTheDocument();
  });

  it('shows label when provided', () => {
    render(<QRCode value="test" label="My QR Code" />);
    expect(screen.getByText('My QR Code')).toBeInTheDocument();
  });

  it('does not show label when not provided', () => {
    const { container } = render(<QRCode value="test" />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('shows description when provided', () => {
    render(<QRCode value="test" description="Scan to open" />);
    expect(screen.getByText('Scan to open')).toBeInTheDocument();
  });

  it('shows download button when downloadable is true', () => {
    render(<QRCode value="test" downloadable />);
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();
  });

  it('hides download button by default', () => {
    render(<QRCode value="test" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('passes the value to the renderer', () => {
    const value = 'https://basuicn.dev';
    render(<QRCode value={value} />);
    expect(screen.getByTestId('qrcode-svg')).toHaveAttribute('data-value', value);
  });

  it('uses sm pixel size (96) for size="sm"', () => {
    render(<QRCode value="test" size="sm" />);
    expect(screen.getByTestId('qrcode-svg')).toHaveAttribute('data-size', '96');
  });

  it('uses md pixel size (128) by default', () => {
    render(<QRCode value="test" />);
    expect(screen.getByTestId('qrcode-svg')).toHaveAttribute('data-size', '128');
  });

  it('uses lg pixel size (192) for size="lg"', () => {
    render(<QRCode value="test" size="lg" />);
    expect(screen.getByTestId('qrcode-svg')).toHaveAttribute('data-size', '192');
  });

  it('uses xl pixel size (256) for size="xl"', () => {
    render(<QRCode value="test" size="xl" />);
    expect(screen.getByTestId('qrcode-svg')).toHaveAttribute('data-size', '256');
  });

  it('uses pixelSize prop over size preset', () => {
    render(<QRCode value="test" size="sm" pixelSize={300} />);
    expect(screen.getByTestId('qrcode-svg')).toHaveAttribute('data-size', '300');
  });

  it('applies custom className to container', () => {
    const { container } = render(<QRCode value="test" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
